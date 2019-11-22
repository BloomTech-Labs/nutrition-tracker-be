const db = require("../../data/knex");

module.exports = {
    find,
    findById,
    updateUserSettings
}


function find() {
	return db('users');
}

function findById(id) {
	return db("users")
		.where({ id })
		.first();
}

async function updateUserSettings(updates, id) {
	await db("users")
		.where({ id })
		.update(updates);
	return findById(id);
}