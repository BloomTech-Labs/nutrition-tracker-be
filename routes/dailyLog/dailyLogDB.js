const db = require("../../data/knex");

module.exports = {
	getCaloricBudget,
	getDailyLog
};

/********************************************************
*                    GET CALORIC BUDGETS                *
********************************************************/
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

/********************************************************
*                      GET DAILY LOG                    *
********************************************************/
function getDailyLog(user_id, from, to) {
  return db("food_log as fl")
    .join("foods as f", {
      "fl.food_id": "f.id"
    })
    .select(
      "fl.id as foodLogID",
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