const express = require('express')
const bodyParser =require('body-parser')
const { Client } = require('pg');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const fastcsv = require("fast-csv");
const fs = require('fs');

//===== Pull in environment variables from Heroku
let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.DATABASE_URL;
if (uri == null || uri == "")
  uri = "postgres://postgres:password@localhost:5432/postgres"; //TODO set an agreed upon local development

let JWT_PASSPHRASE = process.env.JWT_SECRET;
if(JWT_PASSPHRASE == null || JWT_PASSPHRASE == "")
    JWT_PASSPHRASE = 'aRaNd0mPa$$phra$3';

let H_SECRET = process.env.H_SECRET;
if(H_SECRET == null || H_SECRET == "")
    H_SECRET = 'iTsAsEcReTkEy';

//===== Setup the database connection and access functions
dbApi = { };
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
        if(client && client.query) {
            console.log("Running query: \n"+query);
            var res = (await client.query(query, values));
            console.log ("Result: \n"+JSON.stringify(res.rows));
            return res.rows;
        }
        console.log("\nWould be running query: \n"+query);
        if(values)
            console.log("With Values: \n"+JSON.stringify(values));
        return [];
    }
    
    //Debug function, gets the current time from the database server.
    dbApi.now = () => exec('SELECT NOW() as now');
    
    dbApi.storeping = (trackerid, stationid, lat, lon, time) => {
        exec('INSERT INTO public.pings ("timestamp", trackeruuid, stationuuid, "location") VALUES($1, $2, $3, point($4, $5));', [time, trackerid, stationid, lat, lon]);
        return 1;
    }
    
    dbApi.log = (entry) => exec('INSERT INTO public.logs(entry, "timestamp", uid)VALUES($1, now(), 1);', [entry]);

    dbApi.ensureStation = (stationid) => exec("INSERT INTO public.basestations (name, location, description, stationuuid) VALUES('UnknownStation', point(28.600673933160543, -81.19702573512788), 'Unknown Base Station ID#$1', $1) ON CONFLICT DO NOTHING;", [stationid]);

    dbApi.ensureTracker = (trackerid) => exec("INSERT INTO public.trackers (animalid, trackeruuid) VALUES(-1, $1) ON CONFLICT DO NOTHING;", [trackerid]);

    dbApi.listpings = () => exec('SELECT * FROM pings;');

    dbApi.listlogs = () => exec('SELECT * FROM logs;');

    dbApi.userNameExists = async username => {
        var res = (await exec("SELECT uid FROM users where username=$1;",[username]));
        console.log("Result Length: "+res.length);
        return res.length > 0;
    };

    dbApi.addUser = (username, hashedPassword, first_name, last_name) =>
        exec("INSERT INTO users (username, password_hash, first_name, last_name) VALUES($1, $2, $3, $4);", [username, hashedPassword, first_name, last_name]);

    dbApi.loginUser = (username, hashedPassword) => {
        // Generate token
        const token = jwt.sign(
            { username: username, dateCreated: Date.now()},
            JWT_PASSPHRASE
        );
        // Return token
        return token;
    };

    //Given a usernams and passwords, returns true or false, depending on whether they are a valid combination.
    dbApi.verifyCredentials = async (uname, pw) => 
        (await (exec("SELECT uid FROM users where username=$1 AND password_hash=$2;", [uname,pw]))).length > 0;

    dbApi.getUsers = () => exec('SELECT uid, username, first_name, last_name FROM users;');

    dbApi.updatePassword = (email, newPassword) => exec("UPDATE users SET password_hash=$1 WHERE email=$2;",[newPassword, email]);
    
    //Lookup user by UID and return value of permission property
    dbApi.isAdmin = (uid) => 
        exec("SELECT p.type,u.uid FROM users AS u INNER JOIN permissions AS p ON u.uid = p.uid WHERE u.uid = $1 AND p.type='admin';", [uid]);

    //Grant permission property for user with the given uid
    dbApi.grantUserPermission = (uid, permission) => exec('INSERT INTO public.permissions("type", uid)VALUES($1,$2 );', [permission, uid] );
    
    //Revoke permission property for user with the given uid
    dbApi.revokeUserPermission = (uid, permission) => exec('DELETE FROM public.permissions WHERE permission=$1 AND uid=$2;', [permission, uid] );
    
    //Remove the user with the given uid from the DB
    dbApi.deleteUser = (uid) => exec("DELETE FROM public.users WHERE uid= $1",[uid]);

    //Store the uuid and animalId in the Tracker table and return the generated trackerId
    dbApi.registerTracker = (uuid, animalId) => exec('INSERT INTO public.trackers (animalid, trackeruuid) VALUES($1, $2) RETURNING trackerid;',[uuid, animalId]);

    // TODO: Get all trackers from DB matching animalId and uuid provided (optionally provided by the user)
    dbApi.getTrackers = (animalId, uuid) => {
        console.log(`Getting the trackers matching the animalId: ${animalId} and the uuid: ${uuid}...`)
        let trackers = {
            tracker1: {
                animalId: "monkey_01",
                uuid: "8675309"
            },
            tracker2: {
                animalId: "monkey_01",
                uuid: "8675309"
            }
        }
        return trackers;
    }

    // TODO: Update the tracker with the trackerid provided using the new_uuid and/or new_animalId
    dbApi.updateTracker = (trackerId, new_uuid, new_animalId) => {
        console.log(`Updating the trackers matching the trackerId: ${trackerId}...`)
        let tracker = {
            animalId: new_animalId,
            uuid: new_uuid
        };
        return tracker;
    };

    // TODO: Remove the tracker with the provided trackerId from the DB table of trackers
    dbApi.deleteTracker = (trackerId) => {
        console.log(`Deleting the tracker with trackerId: ${trackerId}`);
        return true;
    };

    // TODO: Register the Base Station using the provided arguments
    dbApi.registerBaseStation = (name, location, description) => {
        console.log(`Registering the base station with name: ${name}, location: ${location} and description: ${description}`);
        let stationId = 8675309;
        return stationId;
    };

    // TODO: Get all base stations from the database matching the provided location and name (if any provided)
    dbApi.getBaseStations = (location, name) => {
        console.log(`Getting base station(s) matching location: ${location} and name: ${name}...`);
        // Example base station
        let baseStations = {
            baseStation1: {
                stationId: "1234567",
                name: "BaseStation_01",
                location: "(3.14159, 3.14159)",
                description: "The very first base station."
            },
            baseStation2: {
                stationId: "8675309",
                name: "BaseStation_02",
                location: "(3.14159, 3.14159)",
                description: "The very second base station."
            }
        }
        return baseStations;
    };

    // TODO: Update the name, location and/or description of the base station matching the provided stationId
    dbApi.updateBaseStation = (stationId, new_name, new_location, new_description) => {
        console.log(`Updating the base station matching the stationId: ${stationId}...`)
        let baseStation = {
            name: new_name,
            location: new_location,
            description: new_description
        };
        return baseStation;
    };

    dbApi.deleteBaseStation = (stationId) => {
        console.log(`Deleting the base station with stationId: ${stationId}`);
        return true;
    };

    dbApi.getPings = (trackerId, startTime, endTime) => {
        // IF there is no trackerID get * (ALL) trackers
        // If there is no start

        console.log(`Getting all pings from tracker: ${trackerId} starting from ${startTime} and ending at ${endTime}`);
        // A sample JSON array object containing multiple pings
        let pings = [
            {
                timestamp: Date.UTC(2022, 3, 10, 12, 35, 30, 999),
                trackerid: 98765,
                stationid: 8675309,
                location: "somewhere",
                velocity: "fast"
            },
            {
                timestamp: Date.now(),
                trackerid: 98765,
                stationid: 8675309,
                location: "anywhere",
                velocity: "slow"
            }
        ]
        return pings;
    };

    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));


const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'front-end/build'))); 

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
    let logEntry = req.query.data;

    const seperators = ["N", "W", "T", "A", "B"];
    let lat = "", lon = "", time = "", trackerId = "", baseStationId = "", tempString = "";

    for(let i = 0; i < logEntry.length; i++) {
        if(!seperators.includes(logEntry[i])) {
            tempString = tempString + logEntry[i];
        } else {
            switch (logEntry[i]) {
                // String ended in "N"
                case seperators[0]:
                    lat = tempString;
                    tempString = "";
                    break;

                // String ended in "W"
                case seperators[1]:
                    lon = tempString;
                    tempString = "";
                    break;
                // String ender in "T"
                case seperators[2]:
                    time = tempString.split(",").join("");
                    tempString = "";
                    break;
                // String ended in "A"
                case seperators[3]:
                    trackerId = tempString;
                    tempString = "";
                    break;
                // String ended in "B"
                case seperators[4]:
                    baseStationId = tempString;
                    if(!dbApi.storeping(trackerId, baseStationId, lat, lon, time)) {
                        res.status(400).send("Oops...something went wrong unexpectedly!")
                    }
            }
        }
    }
    res.status(200).send("Everything went well...I hope.");
};
app.post('/storeping', storePing);

app.get('/listpings', async (req, res) => {
    res.send("<pre><code>"+JSON.stringify(await dbApi.listpings(), null, 4)+"</pre></code>")
});

app.get('/listlogs', async (req, res) => {
    res.send("<pre><code>"+JSON.stringify(await dbApi.listlogs(), null, 4)+"</pre></code>")
});


//====== Admin Controller Functions ======
const getUsers = async (req, res) => {
    let uid = req.params.uid;
    let cookieChecked = cookieCheck(req.cookie);
    if(dbApi.isAdmin(uid)){
        let users = dbApi.getUsers();
        res.status(200).send(JSON.stringify(users + cookieChecked));
    } else {
        res.status(403).send('You do not have permission to view this page.');
    }

};

const grantUserPermission = async (req, res) => {
    let user_uid = req.params;
    let new_permission = req.body;
    if(!user_uid || !new_permission) {
        res.status(400).send(JSON.stringify("Please fill out all available fields."));
    } else {
        let admin_uid = req.params.uid;
        if(await dbApi.isAdmin(admin_uid)){
            await dbApi.grantUserPermission(user_uid, new_permission);
            res.status(200).send(JSON.stringify(`Successfully updated the permissions of the user with uid: ${user_uid}.`));
        } else {
            res.status(400).send(JSON.stringify("You do not have permission to perform this action"));
        }
    }
};

const revokeUserPermission =  async (req, res) => {
    let user_uid = req.params;
    let permission = req.body;
    if(!user_uid || !permission) {
        res.status(400).send(JSON.stringify("Please fill out all available fields."));
    } else {
        let admin_uid = req.params.uid;
        if(await dbApi.isAdmin(admin_uid)){
            await dbApi.revokeUserPermission(user_uid, permission);
            res.status(200).send(JSON.stringify(
                `Successfully revoked the permission: ${permission} of the user with uid: ${user_uid}.`)
            );
        } else {
            res.status(400).send(JSON.stringify("You do not have permission to perform this action"));
        }
    }
};

const deleteUser = async (req, res) => {
    let {user_uid} = req.body;
    if(!user_uid) {
        res.status(400).send(JSON.stringify("Please fill out all available fields."));
    } else {
        let admin_uid = req.params.uid;
        if(await dbApi.isAdmin(admin_uid)){
            let deleted = await dbApi.deleteUser(user_uid);
            if(deleted){
                res.status(200).send(JSON.stringify(`Successfully deleted the user with uid: ${user_uid}`));
            } else {
                res.status.send(`Unable to delete the user with uid: ${user_uid}`);
            }
        } else {
            res.status(400).send(JSON.stringify("You do not have permission to perform this action"));
        }
    }
};

//====== User Controller Functions ======
const register = async (req, res) => {
    const { username, password, first_name, last_name } = req.body;

    // Verify all fields were properly filled
    if (username && password && first_name && last_name) {
        //============== Check if the username is already taken =============== //
        if(!(await dbApi.userNameExists(username))) {
            let hashedPassword = hashPassword(password);
            let userAdded = dbApi.addUser(username, hashedPassword, first_name, last_name);
            if(userAdded){
                res.json({body: JSON.stringify(req.body), status: "success"});
            } else {
                res.json({status: "failure"});
            }
        } else {
            res.json({status: "username exist"});
        }
    }
    else res.status(400).send("Please fill out all available fields." + JSON.stringify(req.body));
};


const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Logging in user: ' + JSON.stringify(username));
    console.log('Password: ' +JSON.stringify(password));
    console.log('Body: ' +JSON.stringify(req.body));
    if (username && password) {
        if(await dbApi.userNameExists(username)) {
            let hashedPassword = hashPassword(password);
            let verified = (await dbApi.verifyCredentials(username, hashedPassword));
            console.log('Valid user? ' + JSON.stringify(verified));
            if(verified) {
                let jwToken = dbApi.loginUser(username, hashedPassword);
                // persist the token as 'Q' in cookie with expiry date
                res.cookie("Q", jwToken, {expires: new Date(Date.now() + 900000)}).sendStatus(200);
            } else res.status(400).send("The username and password combination provided was invalid.");
        } else res.status(400).send("We didn't find your account. Please ensure the username you provided is spelled correctly.");
    } else res.status(400).send("Please fill out all available fields.");
};

const logout = async (req, res) => {
    console.log("Logging out...");
    let loggedOut = dbApi.logoutUser(req.params.uid);
    if(loggedOut == true){
        res.status(200).send("Successfully logged out.");
    } else { res.status(400).send("An error occurred attempting to log out.")}
};

// TODO: We need to replace the fake Ethereal SMTP service with a real SMTP service
// TODO: Investigate Heroku SMTP offerings: https://devcenter.heroku.com/articles/smtp
const forgotPassword = async (req, res) => {
    let { email } = req.body;
    let token = generateTempPassword();
    await dbApi.updatePassword(email, token);

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        // sender address
        from: 'robertpomichter@yahoo.com',
        // list of receivers
        to: `${email}`,
        // Subject line
        subject: "Proyecto Titi Password Reset Link",
        // plain text body
        text: `Please use the following link to reset your password: ${
            uri
        }/update-password/${token}`,
        // html body
        html: `<p>Please use the following link to reset your password:</p> <p>${
            uri
        }/update-password/${token}</p>`
    });

    console.log(`An email was sent to the user with email: ${email}.`);
    console.log(info);
    res.status(200).send('Please check your inbox for an email containing a link to reset your password.');
};

const updatePassword = async (req, res) => {
    let { new_password } = req.body, tempPassword = req.params.tempPassword;
    let hashedNewPassword = hashPassword(new_password);
    let user = dbApi.getUserByPassword(tempPassword);
    await dbApi.updatePassword(user.email, hashedNewPassword);
    res.status(200).send("Successfully updated your password.");
};

//====== Tracker Controller Functions ======
// Change this to
const registerTracker = async (req, res) => {
    let { uuid, animalId } = req.body;
    if(!uuid || !animalId) {
        res.status(400).send("Please fill out all available fields.");
    }
    let trackerId = dbApi.registerTracker(uuid, animalId);
    if(trackerId) {
        return res.status(200).send(`Successfully registered tracker: ${trackerId}`);
    } else {
        return res.status(418).send("An error occurred attempting to register your tracker.");
    }
};

const getTrackers = async (req, res) => {
    let { animalId, uuid } = req.params;
    let trackers = dbApi.getTrackers(animalId, uuid);
    res.status(200).send(`Tracker(s): ${JSON.stringify(trackers)} matching animalId: ${animalId} and uuid: ${uuid}...`);
};

const updateTracker = async (req, res) => {
    let {trackerId, new_uuid, new_animalId} = req.body;
    if(trackerId && (new_uuid || new_animalId)) {
        let newTracker = dbApi.updateTracker(trackerId, new_uuid, new_animalId);
        res.status(200).send(`Tracker with trackerid: ${trackerId} updated to ${JSON.stringify(newTracker)}`);
    } else {
        res.status(400).send(`Please provide the trackerid and either a new animalId or a new uuid.`);
    }
};

// TODO: Make this work with new DB API logic
const deleteTracker = async (req, res) => {
    let admin_uid = req.body, trackerId = req.params;
    if(!admin_uid) {
        res.status(400).send("Please fill out all available fields.");
    } else {
        if(await dbApi.isAdmin(admin_uid)){
            dbApi.deleteTracker(trackerId);
            res.status(200).send(JSON.stringify(`Successfully deleted the tracker with trackerId: ${trackerId}.`));
        } else {
            res.status(400).send(JSON.stringify("You do not have permission to perform this action"));
        }
    }
};

//====== Base Station Controller Functions ======
const registerBaseStation = async (req, res) => {
    let { name, location, description } = req.body;
    if(!name || !location) {
        res.status(400).send("Please fill out all available fields.");
    }
    let stationId = dbApi.registerBaseStation(name, location, description);
    if(stationId) {
        return res.status(200).send(`Successfully registered base station: ${stationId}`);
    } else {
        return res.status(418).send("An error occurred attempting to register your base station.");
    }
};

const getBaseStations = async (req, res) => {
    let { location, name } = req.params;
    let baseStations = dbApi.getBaseStations(location, name);
    res.status(200).send(`Base Station(s): ${JSON.stringify(baseStations)}`);
};

const updateBaseStation = async (req, res) => {
    let {stationId, new_name, new_location, new_description} = req.body;
    if(stationId && (new_name || new_location || new_description)) {
        let newBaseStation = dbApi.updateBaseStation(stationId, new_name, new_location, new_description);
        res.status(200).send(`Base Station with stationid: ${stationId} updated to ${JSON.stringify(newBaseStation)}`);
    } else {
        res.status(400).send(`Please provide the trackerid and either a new animalId or a new uuid.`);
    }
};

// TODO: Make this work with new DB API logic
const deleteBaseStation = async (req, res) => {
    let admin_uid = req.body, stationId = req.params;
    if(!admin_uid) {
        res.status(400).send("Please fill out all available fields.");
    } else {
        if(await dbApi.isAdmin(admin_uid)){
            dbApi.deleteBaseStation(stationId);
            res.status(200).send(JSON.stringify(`Successfully deleted the tracker with stationId: ${stationId}.`));
        } else {
            res.status(400).send(JSON.stringify("You do not have permission to perform this action"));
        }
    }
};

//====== Ping Controller Functions ======
// Handle the filtering at this layer
const getPings = async (req, res) => {
    let trackerId = req.params.trackerId;
    let startTime = req.params.startTime;
    let endTime = req.params.endTime;
    if(!startTime && !endTime) {

    }
    console.log(`TrackerID: ${trackerId}, StartTime: ${startTime}, EndTime: ${endTime}`);
    let pings = dbApi.getPings(trackerId, startTime, endTime);
    res.status(200).send(JSON.stringify(pings));
};

const exportCsv = async (req, res) => {
    let trackerId = req.params.trackerId;
    let startTime = req.params.startTime;
    let endTime = req.params.endTime;
    console.log(`TrackerID: ${trackerId}, StartTime: ${startTime}, EndTime: ${endTime}`);

    // Get the data from the database
    let pings = dbApi.getPings(trackerId, startTime, endTime);

    // Export the data to a CSV
    let filepath = `${Date.now().toString()}_proyecto_titi_fastcsv.csv`;
    const ws = fs.createWriteStream(filepath);
    fastcsv
        .write(pings, { headers: true })
        .on("finish", function() {
            console.log(`Successfully wrote data to ${filepath}`);
        })
        .pipe(ws);

    // Download the file
    res.download(filepath, error => {
        if(error){
            console.log(`${error.message}`);
        } else console.log(`Successfully downloaded ${filepath}`);
    });

    // TODO: Delete the file from the server

    res.sendStatus(200);
}

//======= Admin Routes =======
// Restrict to Admin
app.get('/get-users/:uid', getUsers);
app.put('/grant-user-permissions/:uid', grantUserPermission);
app.put('/revoke-user-permissions/:uid', revokeUserPermission);
app.delete('/delete-user/:uid', deleteUser);

//====== User Routes ======
app.post('/register', register);
app.post('/login', login);
app.get('/logout/:uid', logout);
app.post('/forgot-password', forgotPassword);
app.put('/update-password/:tempPassword', updatePassword);

//======= Tracker Routes ======
// TODO: Create endpoint to link the tracker uuid to animalID with datetime (Admin restricted)
app.post('/trackers/:uuid', registerTracker);
app.get('/trackers/:animalId?/:uuid?', getTrackers);
app.put('/trackers', updateTracker);
app.delete('/trackers/:trackerId', deleteTracker); // Restrict to Admin

//======= Base Station Routes ======
// TODO: Create endpoint to link base station to
app.post('/base-stations', registerBaseStation);
app.get('/base-stations/:location?/:name?', getBaseStations);
app.put('/base-stations', updateBaseStation);
app.delete('/base-stations/:stationId', deleteBaseStation); // Restrict to Admin

//======= Ping Routes ======
// TODO: Add download CSV endpoint OR add logic to export endpoint for user to download CSV file
app.get('/pings/:trackerId/:startTime?-:endTime?', getPings);
app.get('/pings/export/:trackerId/:startTime?-:endTime?', exportCsv);

//======= Animal Routes ======
// TODO: This is a stretch goal

//======= Middleware ======
// TODO: Create middleware OR helper function to verify user is signed in
// TODO: Create middleware OR helper function to verify user is authorized to perform action

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'front-end/build','index.html'));
  });

//====== Helper Functions ======
function generateTempPassword() {
    // Generate a random password
    return "temporaryPassword";
}

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

function cookieCheck(jwToken) {
    let decoded = jwt.verify(jwToken, JWT_PASSPHRASE);
    if(!decoded) {
        return(false);
    }
    return decoded;
}

//====== Start listening on whatever port ======
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
