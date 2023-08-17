/** Database config for database. */


const { Client } = require("pg");
const {DB_URI} = require("./config");

let db = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: ENTER_PASSWORD,
  database:`${DB_URI}`
});

db.connect();


module.exports = db;
