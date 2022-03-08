const express = require('express')
const bodyParser =require('body-parser')
const { Client } = require('pg');


//===== Pull in environment variables from Heroku
let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.DATABASE_URL;
if (uri == null || uri == "")
  uri = "postgres://postgres:password@localhost:5432/postgres"; //TODO set an agreed upon local development
            //alternative


//===== Setup the database connection and access functions
dbApi = {};
async function dbInit(){
    const client = await (async ()=>{
        var c;
        try{
            c = new Client({
                connectionString: uri,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            console.log("Connecting to database...");
            await c.connect();
            console.log("Connection complete! Initializing api...");
            return c;
        } catch (e) {
            console.log("Error setting up database connection.");
            console.log(e);
            console.log("\n\nNo Database Connection.\nAll queries will instead be printed, and empty results returned.");
        }
    })();
    /*
     * Helper wrapper which returns just the rows for ease of use.
     * 
     * Arguments: 
     *   query :: The sql query to execute
     *   values :: (Optional) the parameters for a parameterized
     *             query. Should be an array.
     */
    async function exec(query, values){
        if(client && client.query)
            return (await client.query(query, values)).rows;
        console.log("\nWould be running query: \n"+query);
        if(values)
            console.log("With Values: \n"+JSON.stringify(values));
        return [];
    }
    
    //Debug function, gets the current time from the database server.
    dbApi.now = () => exec('SELECT NOW() as now');
    
    dbApi.storeping = (trackerid, stationid, lat, lon, velocity) => exec('INSERT INTO public.pings ("timestamp", trackeruuid, stationuuid, "location", velocity) VALUES(now(), $1, $2, point($3, $4), $5);', [trackerid, stationid, lat, lon, velocity]);
    
    dbApi.log = (entry) => exec('INSERT INTO public.logs(entry, "timestamp", uid)VALUES($1, now(), 1);', [entry]);

    dbApi.ensureStation = (stationid) => exec("INSERT INTO public.basestations (name, location, description, stationuuid) VALUES('UnknownStation', point(28.600673933160543, -81.19702573512788), 'Unknown Base Station ID#$1', $1) ON CONFLICT DO NOTHING;", [stationid]);

    dbApi.ensureTracker = (trackerid) => exec("INSERT INTO public.trackers (animalid, trackeruuid) VALUES(-1, $1) ON CONFLICT DO NOTHING;", [trackerid]);

    dbApi.listpings = () => exec('SELECT * FROM pings;');

    dbApi.listlogs = () => exec('SELECT * FROM logs;');

	// TODO: Check DB for username
    dbApi.userNameExists = (username) => {
        return true;
	}

	// TODO: Add user to DB
    dbApi.addUser = (username, hashedPassword, first_name, last_name) => {
		console.log(`Adding user: ${username}, with password: ${hashedPassword}, and name:${first_name} ${last_name}`);
		return true;
	};

	// TODO: Log the user in and out by toggling a boolean field 
    dbApi.loginUser = (username, hashedPassword) => {
        return true;
    };

    // TODO: Log the user in and out by toggling a boolean field
    dbApi.logoutUser = (username, hashedPassword) => {
        //Example dbUser Object
        var dbUser = {
            username: "username",
            password_hash: "password",
            first_name: "First",
            last_name: "Last",
            logged_in: false
        };
        return dbUser;
    };

    // TODO: Check if the user is logged in and
    dbApi.getUserLoggedInValue = () => { return true };

    // TODO: Get the user from the DB using the hashedPassword
    dbApi.getUserByPassword = (hashedPassword) => {
        //Example dbUser Object
        var dbUser = {
            username: "username",
            password_hash: "password",
            first_name: "First",
            last_name: "Last",
            logged_in: true
        };
        return dbUser;
    };

    dbApi.getUsers = () => console.log("Get ALL users from the DB");

    dbApi.updatePassword = (hashedPassword) => console.log(`Update the user's password with the new password: ${hashedPassword}`);

    dbApi.updateUserPermissions = () => console.log("Update the user permissions specified");

    dbApi.deleteUser = (username) => console.log(`Delete the user with username:${username}`);

    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));




const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true 
}))
// parse application/json
app.use(bodyParser.json())
// Grab anything. Please, just anything.
app.use(bodyParser.text({
    type: "*/*"
}));


//============ Initialize endpoints ============
app.get('/', async (req, res) => {
    res.send(JSON.stringify(await dbApi.now(), null, 4))
});

var storePing = async (req, res) => {
    //req.body.    (TODO: need format from ece team.) 
    var logEntry = {
        body: req.body,
        query: req.query
    };
    await dbApi.log(JSON.stringify(logEntry, null, 4));
	var trackerid= 4242, stationid = 42, lat= 28.365349, lon=81.125664, velocity=0.39;
	await dbApi.ensureStation(stationid);
	await dbApi.ensureTracker(trackerid);
    res.send(JSON.stringify(await dbApi.storeping(trackerid, stationid, lat, lon, velocity), null, 4))
};
app.get('/storeping', storePing);
app.post('/storeping', storePing);

app.get('/listpings', async (req, res) => {
    res.send("<pre><code>"+JSON.stringify(await dbApi.listpings(), null, 4)+"</pre></code>")
});

app.get('/listlogs', async (req, res) => {
    res.send("<pre><code>"+JSON.stringify(await dbApi.listlogs(), null, 4)+"</pre></code>")
});


//====== Admin Controller Functions ======
const getUsers = async (req, res) => {
    dbApi.getUsers();
    res.sendStatus(200);
};

const updateUserPermissions = async (req, res) => {
    res.send("Update the user permissions if the user is the admin.");
};

const deleteUser = async (req, res) => {
    let {username} = req.body;
    dbApi.deleteUser(username);
    res.send(`Delete the user with username:${username}`);
};

//====== User Controller Functions ======
const register = async (req, res) => {
    const { username, password, first_name, last_name } = req.body;

    // Verify all fields were properly filled
    if (!(username && password && first_name && last_name)) {
		//============== Check if the username is already taken =============== //
		if(!dbApi.userNameExists(username)) {
		    let hashedPassword = hashPassword(password);
	        var userAdded = dbApi.addUser(username, hashedPassword, first_name, last_name);
			if(userAdded){
				res.json({status: "success"});
			} else {
				res.json({status: "failure"});
			}
		} else {
            res.json({status: "username exist"});
        };
	}
    else res.send("Please fill out all available fields.");
};


const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        if(dbApi.userNameExists()) {
			let hashedPassword = hashPassword(password);
            let dbUser = dbApi.getUserByPassword(hashedPassword);
			if(dbUser.username === username) {
                dbApi.loginUser(username, hashedPassword);
                res.sendStatus(200);
            } else res.send("The username and password combination provided was invalid.");
        } else res.send("We didn't find your account. Please ensure the username you provided is spelled correctly.");
	} else res.send("Please fill out all available fields.");
};

const logout = async (req, res) => {
    console.log("Logging out...");
        // if(dbApi.userNameExists()) {
        //     let hashedPassword = hashPassword(password);
        //     try {
        //         passwordVerification(username, password);
        //     }
        //     catch(e) {
        //         console.log('An error occurred while trying to login to your account.');
        //         console.log(e);
        //     }
        //
        //     res.sendStatus(200);
        // };
};

const forgotPassword = async (req, res) => {
    let { email } = req.body, tempPassword = generateTempPassword;
    dbApi.updatePassword(tempPassword);
    console.log("Send an email to the user");
    res.sendStatus(200);
};

const updatePassword = async (req, res) => {
    let { password } = req.body;
    let hashedPassword = hashPassword(password);
    dbApi.updatePassword(hashedPassword);
    res.sendStatus(200);
};

//======= Admin Routes =======
app.get('/get-users', getUsers);
app.put('/update-user-permissions', updateUserPermissions);
app.delete('/delete-user', deleteUser);

//====== User Routes ======
app.post('/register', register);
app.get('/register', register);
app.post('/login', login);
app.get('/logout', logout);
app.post('/forgot-password', forgotPassword);
app.put('/update-password', updatePassword);

//======= Monkey Data Routes ======


//====== Helper Functions ======
function generateTempPassword() {
    // Generate a random password
    return "temporaryPassword";
}

function hashPassword(password) {
    console.log(`Hash the password: ${password}`)
	return password;
}

//====== Start listening on whatever port ======
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
