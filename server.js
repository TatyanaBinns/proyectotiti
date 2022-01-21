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
    
    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));




const app = express();
//============ Initialize endpoints ============
app.get('/', (req, res) => (async() =>
    res.send(JSON.stringify(await dbApi.now()))
)());


//====== Start listening on whatever port ======
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
