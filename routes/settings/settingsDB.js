const db = require("../../data/knex");

module.exports = {
    find
}

//Returns all bucket lists
function find() {
	return db('users');
}