//DELETE AND REMAKE DB ROLE & DB
// -U = user
// -d = database
// -a => Print all nonempty input lines to standard output as they are read. (This does not apply to lines read interactively.) This is equivalent to setting the variable ECHO to all.
// -f = filename
// // RIGHT CLICK ON THIS FILE IN VS CODE, CLICK "OPEN IN TERMINAL", THEN RUN THIS COMMAND:
const run_sql_file = `

psql -U postgres -a -f remake_database.sql

`;

// RESTART POSTGRES SERVER
// WINDOWS - POWERSHELL AS ADMINISTRATOR
// see: https://imgur.com/a/Ap7gtIT for finding postgres service name if this doesn't work for you
const powershell_restart_postgres_server = `

Restart-Service -Name postgresql-x64-12

`;

// CREATE NUTRITION TRACKER DB ROLE (aka user)
// login to psql, using:
// psql -U postgres
// (this is the root user)
const create_nutrition_tracker_user_sql = `

  CREATE ROLE nutrition_tracker
  WITH 
    LOGIN
    PASSWORD 'testpass'
    CREATEDB 
    NOSUPERUSER
    NOCREATEROLE
  ;

`;

// CREATE NUTRITION TRACKER DATABASE
// login to psql, using:
// psql -U postgres
// (this is the root user)
const create_database_sql = `

  CREATE DATABASE nutrition_tracker
    WITH 
    OWNER = nutrition_tracker
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

`;

// DROP nutrition_tracker DATABASE (aka delete)
// login to psql, using:
// psql -U postgres
// (this is the root user)
const drop_database_sql = `

  DROP DATABASE IF EXISTS nutrition_tracker;

`;

// DROP nutrition_tracker DB ROLE (aka delete)
// login to psql, using:
// psql -U postgres
// (this is the root user)
const drop_role_sql = `

  DROP ROLE IF EXISTS nutrition_tracker;

`;

const full_query_list = [
  drop_database_sql,
  drop_role_sql,
  create_nutrition_tracker_user_sql,
  create_database_sql
];

let full_query = full_query_list.join(" "); //sql just needs a space between statements. extra spaces dont hurt, so thus we add a space on join()

const fs = require("fs");

fs.writeFile("remake_database.sql", full_query, err => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log("sql output to file!");
});
