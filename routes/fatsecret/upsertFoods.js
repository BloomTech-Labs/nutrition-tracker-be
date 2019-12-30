require("dotenv").config();

const pgp = require("pg-promise")();

const dbConnection = process.env.DATABASE_URL;

const db = pgp(dbConnection);

module.exports = { upsertFoods };

function upsertFoods(data) {
  const query = upsertQuery(data);
  try {
    return db.any(query);
  } catch (e) {
    return e;
  }
}

function upsertQuery(data) {
  const columnSet = new pgp.helpers.ColumnSet(
    [
      "fatsecret_food_id",
      "serving_id",
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
    ],
    { table: "foods" }
  );
  return (
    pgp.helpers.insert(data, columnSet) +
    " ON CONFLICT(fatsecret_food_id, serving_id) DO UPDATE SET " +
    columnSet.assignColumns({
      from: "EXCLUDED",
      skip: ["fatsecret_food_id", "serving_id"]
    }) +
    " RETURNING *"
  );
}
