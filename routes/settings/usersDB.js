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
  findActivityLevelById,
  addActivityLevel,
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
 *                 Activity Level Queries               *
 ********************************************************/

function findActivityLevelById(user_id) {
  return db("user_budget_data")
    .select(
      "activity_level",
    )
    .where({ user_id })
    .whereNotNull("activity_level")
    .orderBy("start_date", "desc")
		.first();
}

async function addActivityLevel(data) {
	await db("user_budget_data")
    .insert(data);
    return await findActivityLevelById(data.user_id);
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
	await db("user_metric_history")
    .insert(data);
    return await findCurrentWeightById(data.user_id);
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
      "fl.food_id as foodID",
      "fl.fatsecret_food_id as fatSecretFoodID",
      "fl.time_consumed_at as timeConsumedAt",
      "fl.time_zone_name as timeZoneName",
      "fl.time_zone_abbr as timeZoneAbbr",
      "fl.quantity",
      "f.food_name as foodName",
      "f.serving_desc as servingDescription",
      "f.calories_kcal as caloriesKcal",
      "f.fat_g as fatGrams",
      "f.carbs_g as carbsGrams",
      "f.protein_g as proteinGrams"
    )
    .where("fl.user_id", "=", user_id)
    .whereBetween("fl.time_consumed_at", [from, to])
    .orderBy("fl.time_consumed_at");
}
