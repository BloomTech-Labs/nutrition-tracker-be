const db = require("../../data/knex");

module.exports = {
  findByUserId,
	updateUser,
  findMacroRatiosById,
  addMacroRatios,
  findCurrentWeightById,
  addCurrentWeight,
  findWeightGoalById,
  addWeightGoal,
	getCaloricBudget,
	getDailyLog
};

/*
  TODO:
    ask will about UPSERT for any inserts into user_budget_data
    it should be UPSERT in the event that the user updates on
    the same day, (we don't want to have more than one insert for
    a single date, so it should just replace the existing one)

    this will be important for RC2
*/

/********************************************************
 *                  User Queries                        *
 ********************************************************/
function findByUserId(id) {
	return db("users")
		.where({ id })
		.first();
}

async function updateUser(updates, id) {
	await db("users")
		.where({ id })
		.update(updates);
	return findByUserId(id);
}


/********************************************************
 *                  Macro Queries                        *
 ********************************************************/

function findMacroRatiosById(user_id) {
  return db("user_budget_data")
    .select(
      "fat_ratio",
      "protein_ratio",
      "carb_ratio"
    )
    .where({ user_id })
    .whereNotNull("fat_ratio")
    .whereNotNull("protein_ratio")
    .whereNotNull("carb_ratio")
    .orderBy("start_date", "desc")
		.first();
}

async function addMacroRatios(data) {
	await db("user_budget_data")
		.insert(data);
}


/********************************************************
 *                 Weight Goal Queries                  *
 ********************************************************/

function findWeightGoalById(user_id) {
  return db("user_budget_data")
    .select(
      "weekly_goal_rate",
      "weight_goal_kg",
    )
    .where({ user_id })
    .whereNotNull("weekly_goal_rate")
    .whereNotNull("weight_goal_kg")
    .orderBy("start_date", "desc")
		.first();
}

async function addWeightGoal(data) {
	await db("user_budget_data")
		.insert(data);
}

/********************************************************
 *                 Current Weight Queries               *
 ********************************************************/

function findCurrentWeightById(user_id) {
  return db("user_metric_history")
    .select(
      "weight_kg",
    )
    .where({ user_id })
    .orderBy("start_date", "desc")
		.first();
}

async function addCurrentWeight(data) {
  console.log("[data]", data);
	await db("user_metric_history")
		.insert(data);
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
