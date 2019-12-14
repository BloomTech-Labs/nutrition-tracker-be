const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
const knex = require("knex");

module.exports = knex(config);

// const knex = require('knex');

// const knexfile = require('../knexfile');


// const env = process.env.NODE_ENV || 'development';
// const configOptions = knexfile[env];

// module.exports = knex(configOptions);
