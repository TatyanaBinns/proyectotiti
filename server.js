const express = require('express')
const bodyParser =require('body-parser')
const { Client } = require('pg');


//===== Pull in environment variables from Heroku
let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.DATABASE_URL;
if (uri == null || uri == "")
  uri = "postgres://postgres:gorob121513@localhost:5432/postgres"; //TODO set an agreed upon local development
            //alternative


//===== Setup the database connection and access functions
dbApi = {};
async function dbInit(){
    const client = new Client({
        connectionString: uri,
        ssl: { 
            rejectUnauthorized: false 
        }
    });
    console.log("Connecting to database...");
    await client.connect();
    console.log("Connection complete! Initializing api...");
    
    /*
     * Helper wrapper which returns just the rows for ease of use.
     * 
     * Arguments: 
     *   query :: The sql query to execute
     *   values :: (Optional) the parameters for a parameterized
     *             query. Should be an array.
     */
    async function exec(query, values){
        return (await client.query(query, values)).rows;
    }
    
    //Debug function, gets the current time from the database server.
    dbApi.now = () => exec('SELECT NOW() as now');
    
    dbApi.storeping = (trackerid, stationid, lat, lon, velocity) => exec('INSERT INTO public.pings ("timestamp", trackeruuid, stationuuid, "location", velocity) VALUES(now(), $1, $2, point($3, $4), $5);', [trackerid, stationid, lat, lon, velocity]);
    
    dbApi.log = (entry) => exec('INSERT INTO public.logs(entry, "timestamp", uid)VALUES($1, now(), 1);', [entry]);

    dbApi.ensureStation = (stationid) => exec("INSERT INTO public.basestations (name, location, description, stationuuid) VALUES('UnknownStation', point(28.600673933160543, -81.19702573512788), 'Unknown Base Station ID#$1', $1) ON CONFLICT DO NOTHING;", [stationid]);

    dbApi.ensureTracker = (trackerid) => exec("INSERT INTO public.trackers (animalid, trackeruuid) VALUES(-1, $1) ON CONFLICT DO NOTHING;", [trackerid]);

    dbApi.listpings = () => exec('SELECT * FROM pings;');

    dbApi.usernameExists = () => console.log('Please verify the email/username doesn\'t already exist.');

    dbApi.addUser = () => console.log('Please add the user');

    dbApi.loginUser = () => console.log(
        'Please add a boolean field for the user to represent whether they are signed in.\n' +
        'We will update this field whenever the user signs in or signs out.'
    );

    dbApi.getUserLoggedInValue = () => console.log(
        'Please check the user table for the boolean field representing whether the user is logged in.'
    );

    dbApi.getUserByPassword = (hashedPassword) => console.log(`Get the user with the ${hashedPassword}.`);

    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));




const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//============ Initialize endpoints ============
app.get('/', (req, res) => (async() => {
    res.send(JSON.stringify(await dbApi.now(), null, 4))
})());

var storePing = (req, res) => (async() => {
    //req.body.    (TODO: need format from ece team.) 
    var logEntry = {
        raw: req.rawBody,
        body: req.body,
        query: req.query
    };
    await dbApi.log(JSON.stringify(logEntry, null, 4));
	var trackerid= 4242, stationid = 42, lat= 28.365349, lon=81.125664, velocity=0.39;
	await dbApi.ensureStation(stationid);
	await dbApi.ensureTracker(trackerid);
    res.send(JSON.stringify(await dbApi.storeping(trackerid, stationid, lat, lon, velocity), null, 4))
})();
app.get('/storeping', storePing);
app.post('/storeping', storePing);

app.get('/listpings', (req, res) => (async() => {
    res.send("<pre><code>"+JSON.stringify(await dbApi.listpings(), null, 4)+"</pre></code>")
})());

//====== User Controller Methods ======
const register = (req, res) => (async() => {
    const { username, password, first_name, last_name } = req.body;
    if (username && password && first_name && last_name)
        // if(!dbApi.userNameExists()) {
        //     try {
        //         let hashedPassword = hashPassword(password);
        //         dbApi.addUser(username, hashedPassword, first_name, last_name);
        //     }
        //     catch(e) {
        //         console.log('An error occurred while trying to register your account.');
        //         console.log(e);
        //     }
        //
        //     res.sendStatus(200);
        // };
        res.send("If the email/username doesn't already exist then add the user.");
    else res.send("Please fill out all available fields.");
});

const login = (req, res) => (async() => {
    const { username, password } = req.body;
    if (username && password )
        // if(dbApi.userNameExists()) {
        //     let hashedPassword = hashPassword(password);
        //     let dbUser = dbApi.getUserByPassword(hashedPassword);
        //     if(dbUser === username) {
        //         try {
        //             dbApi.loginUser(username, hashedPassword);
        //         }
        //         catch(e) {
        //             console.log('An error occurred while trying to login to your account.');
        //             console.log(e);
        //         }
        //         res.sendStatus(200);
        //     }
        // };
        res.send("If the username already exist then compare the username/passwords and login the user.");
    else res.send("Please fill out all available fields.");
});

const logout = (req, res) => (async () => {
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
});

//====== User Routes ======
app.post('/register', register);
app.get('/login', login);
app.post('/logout', logout);


//======= Admin Routes =======


//======= Monkey Data Routes ======


//====== Helper Functions ======
function hashPassword(password) {
    console.log(password);
};

//====== Start listening on whatever port ======
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
