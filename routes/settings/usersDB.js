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

async function addWeightGoal(data) {
  await db("user_budget_data")
    .insert(data)
    .returning("*");
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
