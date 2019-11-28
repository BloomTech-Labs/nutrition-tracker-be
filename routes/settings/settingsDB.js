const db = require("../../data/knex");

module.exports = {
    find,
    findByUserId,
	updateUser,
	findMetricHistoryById,
	updateMetrics,
	findBudgetDataById,
	updateBudgetData,
	getCaloricBudget,
	getDailyLog
};

function find() {
  return db("users");
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

function findBudgetDataById(id) {
	return db("user_budget_data")
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

async function updateBudgetData(updates, id) {
	await db("user_budget_data")
		.where({ id })
		.update(updates);
	return findBudgetDataById(id);
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
