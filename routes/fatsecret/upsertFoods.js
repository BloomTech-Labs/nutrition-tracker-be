// db for sending/receiving queries to the database
// not using knex because knex doesn't like sending a raw sql query if it has upserting
const { db } = require("../../data/pg-promise.js");

const { createUpsertQuerySql } = require("../../data/helpers/upsert.js");

module.exports = { upsertFoods };

function upsertFoods(data) {
  const table = "foods";

  const setColumns = [
    "retrieved_at",
    "food_name",
    "food_type",
    "brand_name",
    "serving_url",
    "serving_desc",
    "serving_qty",
    "serving_unit",
    "metric_serving_amt",
    "metric_serving_unit",
    "calories_kcal",
    "fat_g",
    "carbs_g",
    "protein_g",
    "saturated_fat_g",
    "monounsaturated_fat_g",
    "polyunsaturated_fat_g",
    "trans_fat_g",
    "fiber_g",
    "sugar_g",
    "cholesterol_mg",
    "sodium_mg",
    "potassium_mg",
    "vitamin_a_daily_pct",
    "vitamin_c_daily_pct",
    "calcium_daily_pct",
    "iron_daily_pct"
  ];

  const onConflictColumns = ["fatsecret_food_id", "serving_id"];

  const skipInsertColumns = ["id"];

  const columns = [...onConflictColumns, ...setColumns];

  const skipUpdateColumns = [...skipInsertColumns, ...onConflictColumns];

  try {
    const querySql = createUpsertQuerySql(data, table, columns, onConflictColumns, skipUpdateColumns);

    return db.any(querySql);
  } catch (e) {
    return e;
  }
}
