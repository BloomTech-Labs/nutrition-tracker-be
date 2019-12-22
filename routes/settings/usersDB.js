const db = require("../../data/knex");
const {
  recalcAndUpdateCaloricBudget
} = require("./recalcAndUpdateCaloricBudget");

module.exports = {
  findByUserId,
  updateUser,
  findMacroRatiosById,
  addMacroRatios,
  findCurrentWeightById,
  addCurrentWeight,
  findWeightGoalById,
  addGoalWeeklyRateChangeRate,
  addWeightGoal,
  findActivityLevelById,
  addActivityLevel,
  getDailyLog
};

/********************************************************
 *                  User Queries                        *
 ********************************************************/
function findByUserId(id) {
  return db("users")
    .where({ id })
    .first();
}

async function updateUser(updates, id) {
  const updatedUser = await db("users")
    .where({ id })
    .update(updates)
    .returning("*");

  // any time we update the user, we want to recalculate the caloric budgets
  // because their weight may have changed, which affects the budget

  // currently we are not using the updatedCaloricBudget, but we may want to
  // in the future to alert the user of their new target caloric budget.
  const updatedCaloricBudget = await recalcAndUpdateCaloricBudget(id);

  updateWeightGoalIfNecessary();

  console.log("[updatedCaloricBudget]", updatedCaloricBudget);

  return updatedUser;
}

/********************************************************
 *                  Macro Queries                        *
 ********************************************************/
function findMacroRatiosById(user_id) {
  return db("user_budget_data")
    .select("fat_ratio", "protein_ratio", "carb_ratio")
    .where({ user_id })
    .whereNotNull("fat_ratio")
    .whereNotNull("protein_ratio")
    .whereNotNull("carb_ratio")
    .orderBy("applicable_date", "desc")
    .first();
}

async function addMacroRatios(data) {
  await db("user_budget_data")
    .insert(data)
    .returning("*");
}

/********************************************************
 *                 Weight Goal Queries                  *
 ********************************************************/
function findWeightGoalById(user_id) {
  return db("user_budget_data")
    .select("goal_weekly_weight_change_rate", "goal_weight_kg")
    .where({ user_id })
    .whereNotNull("goal_weekly_weight_change_rate")
    .whereNotNull("goal_weight_kg")
    .orderBy("applicable_date", "desc")
    .first();
}

//would like to rename this function to updateWeightGoal (and make an "addWeightGoal" which is called for a brand new user (if that's a separate endpoint or something, or is called by the frontend))
//i know "new" and "updated" weight goals are the same
//database function, but to the frontend, they just want to
//edit. and they dont care about the backend schema
//and if it's literally the same function, i would just
//add a variable to export that's just a pointer to the
//function that's the same for both, instead.
// - WE
async function addWeightGoal(data) {
  const updatedWeightGoal = await db("user_budget_data")
    .insert(data)
    .returning("*");

  updateGoalDateIfNecessary();

  return updatedWeightGoal;
}

/********************************************************
 *                Goal Weekly Rate Queries              *
 ********************************************************/
function addGoalWeeklyRateChangeRate() {
  let updatedGoalWeeklyRateChangeRate = `/*
    // PLACEHOLDER FOR CHAZ's ADD NEW RATE CHANGE FUNCTIONALITY CODE
    // THIS VARIABLE IS WHAT WE ARE USING TO RETURN AT END OF FUNCTION
  */`;

  updateGoalDateIfNecessary();

  return updatedGoalWeeklyRateChangeRate;
}

/********************************************************
 *                 Activity Level Queries               *
 ********************************************************/
function findActivityLevelById(user_id) {
  return db("user_budget_data")
    .select("activity_level")
    .where({ user_id })
    .whereNotNull("activity_level")
    .orderBy("applicable_date", "desc")
    .first();
}

async function addActivityLevel(data) {
  const updatedUser = await db("user_budget_data")
    .insert(data)
    .returning("*");

  // any time we update the user, we want to recalculate the caloric budgets
  // because their weight may have changed, which affects the budget

  // currently we are not using the updatedCaloricBudget, but we may want to
  // in the future to alert the user of their new target caloric budget.
  const updatedCaloricBudget = await recalcAndUpdateCaloricBudget(data.user_id);

  console.log("[data.user_id]", data.user_id);

  return updatedUser;
}

/********************************************************
 *                 Current Weight Queries               *
 ********************************************************/
function findCurrentWeightById(user_id) {
  return db("user_budget_data")
    .select("actual_weight_kg")
    .where({ user_id })
    .whereNotNull("actual_weight_kg")
    .orderBy("applicable_date", "desc")
    .first();
}

async function addCurrentWeight(data) {
  const updatedUser = await db("user_budget_data")
    .insert(data)
    .returning("*");

  // any time we update the user, we want to recalculate the caloric budgets
  // because their weight may have changed, which affects the budget

  // currently we are not using the updatedCaloricBudget, but we may want to
  // in the future to alert the user of their new target caloric budget.
  const updatedCaloricBudget = await recalcAndUpdateCaloricBudget(data.user_id);

  // if necessary, calculates and returns the new goal date if our goal weight
  // and previous goal date were unattainable
  const updatedGoalDate = updateGoalDateIfNecessary();

  return updatedUser;
}

/********************************************************
 *                      GET DAILY LOG                   *
 ********************************************************/
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

/********************************************************
 *                   GET WEIGHT PROGRESS                 *
 ********************************************************/

function getWeightProgress() {}
