const db = require("../../data/knex");

module.exports = {
  find,
  findById,
  updateUserSettings,
  getCaloricBudget,
  getDailyLog
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function updateUserSettings(updates, id) {
  await db("users").where({ id }).update(updates);
  return findById(id);
}
/***********************************************
*                   DATABASE QUERIES           *
***********************************************/
function getCaloricBudget(user_id) {
  return db("user_budget_data")
    .select(
      "caloric_budget", 
      "fat_ratio", 
      "protein_ratio", 
      "carb_ratio")
    .where({ user_id })
    .first();
}

function getDailyLog(user_id, from, to) {
  return db("food_log as fl")
    .join("foods as f", {
      "fl.food_id": "f.id"
    })
    .select(
      "fl.food_id",
      "fl.fatsecret_food_id",
      "fl.serving_id",
      "fl.time_consumed_at",
      "utc_offset_seconds",
      "fl.quantity",
      "f.food_name",
      "f.serving_desc",
      "f.calories_kcal",
      "f.fat_g",
      "f.carbs_g",
      "f.protein_g"
    )
    .where("fl.user_id", "=", user_id)
    .whereBetween("fl.time_consumed_at", [from, to])
    .orderBy("fl.time_consumed_at");
}
