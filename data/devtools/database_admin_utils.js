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

//dumps the "food_log" creation script into "food_log.sql" file
const database_name = "nutrition_tracker";
const superuser = "postgres";

const table_name = "foods";
const generate_create_table_script = `

pg_dump -U ${superuser} -t 'public.${table_name}' --schema-only ${database_name} > ${table_name}.sql

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

fs.writeFile(
  `dump_create_table_script_for_${table_name}`,
  generate_create_table_script,
  err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log(" output to file!");
  }
);

const pg_dump_command = `

pg_dump.exe --file "database_backup.sql" --username "postgres" --verbose --format=p --schema-only --no-privileges --no-tablespaces --no-unlogged-table-data "nutrition_tracker"

`;
