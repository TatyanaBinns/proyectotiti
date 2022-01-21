const express = require('express')
const pgURIParsr = require('pg-connection-string').parse;
const { Client } = require('pg')


let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.DATABASE_URL;
if (uri == null || uri == "")
  uri = ""; //TODO set an agreed upon local development
            //alternative

dbApi = {};
async function dbInit(){
    var config = pgURIParsr(uri);
    config.ssl = true;
    const client = new Client(config);
    console.log("Connecting to database...");
    await client.connect();
    Console.log("Conneciton complete! Initializing api...");
    
    dbApi.now = () => client.query('SELECT NOW() as now');
    
    console.log("Database API Loaded");
}
dbInit().catch(err => console.log(err));



const app = express();

app.get('/', (req, res) => {
    (async() =>
        res.send(JSON.stringify(await dbApi.now()))
    )();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})