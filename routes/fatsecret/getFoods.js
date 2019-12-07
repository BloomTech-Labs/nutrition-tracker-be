const db = require("../../data/knex.js");
// const moment = require("moment")

module.exports = {
  getServingsByFatsecretFoodId,
  insertFatsecretFoods,
  deleteFatsecretFoods,
  upsert_hard_coded
};

function getServingsByFatsecretFoodId(fatsecret_food_id) {
  const fatsecretCacheLimitHours = 22;
  // calculate current time, minus 22 hours -- to make sure we dont overlap with fatsecret's cache time length maximum of 24 hours.
  // 22h = 1000ms*60s*60min*22hrs = 79200000 = 79.2 million ms = 79.2*10**6
  const fatsecretCacheLimitMs = 1000 * 60 * 60 * fatsecretCacheLimitHours;
  const cacheCutoff = new Date(Date.now() - fatsecretCacheLimitMs);
  // use moment to calc 22 hours before now, to use pass to .where() clause

  return db("foods as f")
    .select("f.*")
    .where("f.fatsecret_food_id", fatsecret_food_id)
    .where("f.retrieved_at", ">", cacheCutoff)
    .orderBy("f.id", "asc");
}

function insertFatsecretFoods(foods) {
  return db("foods as f")
    .insert(foods)
    .returning("*");
}

function deleteFatsecretFoods(fatsecret_food_id) {
  return db("foods as f")
    .delete()
    .where("f.fatsecret_food_id", fatsecret_food_id)
    .returning("*");
}

const value_arr_string = `

(3433, 2, DEFAULT, 'white bread', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'a slice', 1, 'a slice', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5)

`;

const value_arr_string_all = `

(3433, 2, DEFAULT, 'white bread', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'a slice', 1, 'a slice', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(4881, 2, DEFAULT, 'cheese pizza', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'a slice', 1, 'a slice', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8862, 2, DEFAULT, 'chicken breast', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'one', 1, 'one', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8372, 34, DEFAULT, 'salmon', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', '1oz boneless', 1, 'one', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8372, 33, DEFAULT, 'cheese pizza', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'a slice', 1, 'a slice', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8372, 35, DEFAULT, 'chicken breast', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'one', 1, 'one', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8372, 36, DEFAULT, 'salmon', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', '1oz boneless', 1, 'one', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(8372, 37, DEFAULT, 'salmon', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', '1oz boneless', 1, 'one', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 170, NULL, 0, 0, 0, 5), 
(5735, 21131, DEFAULT, 'Roasted Potato', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', '1 small (1-3/4\' to 2-1/4\'"" dia, raw)""', 110, 'g', 164, 0.82, 22.07, 2.55, 0.99, 2.56, 3.79, 7.7, 2.7, 0.99, NULL, 111, NULL, 0, 0, 2, 6)

`;

const upsert_sql = `

insert into foods (
  fatsecret_food_id, serving_id, retrieved_at, food_name, serving_url, serving_desc, metric_serving_amt, metric_serving_unit, calories_kcal, fat_g, carbs_g, protein_g, saturated_fat_g, monounsaturated_fat_g, polyunsaturated_fat_g, trans_fat_g, fiber_g, sugar_g, cholesterol_mg, sodium_mg, potassium_mg, vitamin_a_daily_pct, vitamin_c_daily_pct, calcium_daily_pct, iron_daily_pct
) values 
  ${value_arr_string}
ON CONFLICT (fatsecret_food_id, serving_id) DO UPDATE SET
  retrieved_at = EXCLUDED.retrieved_at, 
  food_name = EXCLUDED.food_name, 
  serving_url = EXCLUDED.serving_url, 
  serving_desc = EXCLUDED.serving_desc, 
  metric_serving_amt = EXCLUDED.metric_serving_amt, 
  metric_serving_unit = EXCLUDED.metric_serving_unit, 
  calories_kcal = EXCLUDED.calories_kcal, 
  fat_g = EXCLUDED.fat_g, 
  carbs_g = EXCLUDED.carbs_g, 
  protein_g = EXCLUDED.protein_g, 
  saturated_fat_g = EXCLUDED.saturated_fat_g, 
  monounsaturated_fat_g = EXCLUDED.monounsaturated_fat_g, 
  polyunsaturated_fat_g = EXCLUDED.polyunsaturated_fat_g, 
  trans_fat_g = EXCLUDED.trans_fat_g, 
  fiber_g = EXCLUDED.fiber_g, 
  sugar_g = EXCLUDED.sugar_g, 
  cholesterol_mg = EXCLUDED.cholesterol_mg, 
  sodium_mg = EXCLUDED.sodium_mg, 
  potassium_mg = EXCLUDED.potassium_mg, 
  vitamin_a_daily_pct = EXCLUDED.vitamin_a_daily_pct, 
  vitamin_c_daily_pct = EXCLUDED.vitamin_c_daily_pct, 
  calcium_daily_pct = EXCLUDED.calcium_daily_pct, 
  iron_daily_pct = EXCLUDED.iron_daily_pct
RETURNING *
;

`;

function upsert_hard_coded() {
  console.log(upsert_sql);
  return db.schema.raw(upsert_sql);
}
