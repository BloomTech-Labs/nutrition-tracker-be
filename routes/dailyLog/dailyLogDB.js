const db = require("../../data/knex");

module.exports = {
  getCaloricBudget,
  getDailyLog
};

/********************************************************
 *                    GET CALORIC BUDGETS                *
 ********************************************************/
async function getCaloricBudget(user_id) {
  const { caloric_budget } = await db("user_budget_data")
    .select("caloric_budget")
    .where({ user_id })
    .whereNotNull("caloric_budget")
    .orderBy("applicable_date", "desc")
    .first();
  const { fat_ratio, protein_ratio, carb_ratio } = await db("user_budget_data")
    .select("fat_ratio", "protein_ratio", "carb_ratio")
    .where({ user_id })
    .whereNotNull("fat_ratio")
    .whereNotNull("protein_ratio")
    .whereNotNull("carb_ratio")
    .orderBy("applicable_date", "desc")
    .first();
  return { caloric_budget, fat_ratio, protein_ratio, carb_ratio };
}

/********************************************************
 *                      GET DAILY LOG                    *
 ********************************************************/
function getDailyLog(user_id, from, to) {
  return db("food_log as fl")
    .join("foods as f", {
      "f.serving_id": "fl.serving_id"
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
