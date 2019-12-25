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
  addActivityLevel
};

/********************************************************
 *                  User Queries                        *
 ********************************************************/
function findByUserId(id) {
  return db("users")
    .where({ id })
    .first();
}

function updateUser(updates, id) {
  return db("users")
    .where({ id })
    .update(updates)
    .returning("*");
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

function addActivityLevel(data) {
  return db("user_budget_data")
    .insert(data)
    .returning("*");
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

function addCurrentWeight(data) {
  return db("user_budget_data")
    .insert(data)
    .returning("*");
}
