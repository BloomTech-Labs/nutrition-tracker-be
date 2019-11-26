const db = require("../../data/knex");

module.exports = {
    find,
    findByUserId,
	updateUser,
	findMetricHistoryById,
	updateMetrics
}


function find() {
	return db('users');
}

function findByUserId(id) {
	return db("users")
		.where({ id })
		.first();
}

function findMetricHistoryById(id) {
	return db("user_metric_history")
		.where({ id })
		.first();
}

async function updateUser(updates, id) {
	await db("users")
		.where({ id })
		.update(updates);
	return findByUserId(id);
}

async function updateMetrics(updates, id) {
	await db("user_metric_history")
		.where({ id })
		.update(updates);
	return findMetricHistoryById(id);
}