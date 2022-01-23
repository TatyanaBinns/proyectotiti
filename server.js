const express = require('express')
const { Client } = require('pg');


//===== Pull in environment variables from Heroku
let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.DATABASE_URL;
if (uri == null || uri == "")
  uri = ""; //TODO set an agreed upon local development
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

    dbApi.ensureStation = (stationid) => exec("INSERT INTO public.basestations (name, location, description, stationuuid) VALUES('UnknownStation', point(28.600673933160543, -81.19702573512788), 'Unknown Base Station ID#$1', $1) ON CONFLICT DO NOTHING;", [stationid]);

    dbApi.ensureTracker = (trackerid) => exec("INSERT INTO public.trackers (animalid, trackeruuid) VALUES(-1, $1) ON CONFLICT DO NOTHING;", [trackerid]);

    dbApi.listpings = () => exec('SELECT * FROM pings;');


    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));




const app = express();
//============ Initialize endpoints ============
app.get('/', (req, res) => (async() => {
    res.send(JSON.stringify(await dbApi.now()))
})());
app.get('/storeping', (req, res) => (async() => {
	var trackerid= 4242, stationid = 42, lat= 28.365349, lon=81.125664, velocity=0.39;
	await dbApi.ensureStation(stationid);
	await dbApi.ensureTracker(trackerid);
    res.send(JSON.stringify(await dbApi.storeping(trackerid, stationid, lat, lon, velocity)))
})());
app.get('/listpings', (req, res) => (async() => {
    res.send(JSON.stringify(await dbApi.listpings()))
})());


//====== Start listening on whatever port ======
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
