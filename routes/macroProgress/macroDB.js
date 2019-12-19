const db = require("../../data/knex");

module.exports = {
  findByUserId
};

// check the daily nutrition totals table for all entries of this specific user
function findByUserId(user_id) {
  return db("daily_nutrition_totals").where({ user_id });
}
