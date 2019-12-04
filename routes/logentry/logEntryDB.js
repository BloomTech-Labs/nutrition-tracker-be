const db = require("../../data/knex");

module.exports = {
  addLogEntry,
  removeLogEntry
};

function addLogEntry(log_entry) {
  return db("food_log")
    .insert(log_entry)
    .returning("*");
}

function removeLogEntry(id) {
  return db("food_log")
    .delete()
    .where({id})
    .returning("*");
}