require("dotenv").config();

const pgp = require("pg-promise")();

const dbConnection = process.env.DATABASE_URL;

const db = pgp(dbConnection);

module.exports = { db };
