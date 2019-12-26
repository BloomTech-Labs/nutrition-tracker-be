require("dotenv").config();
const pgp = require("pg-promise")();

const dbConnection = process.env.DATABASE_URL;

const db = pgp(dbConnection);

module.exports = { db, pgp };
// db for sending/receiving queries to the database
// pgp for its helper functions that build the sql query string
