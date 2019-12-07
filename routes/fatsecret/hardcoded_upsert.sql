
insert into foods (
  fatsecret_food_id, serving_id, retrieved_at, food_name, serving_url, serving_desc, metric_serving_amt, metric_serving_unit, calories_kcal, fat_g, carbs_g, protein_g, saturated_fat_g, monounsaturated_fat_g, polyunsaturated_fat_g, trans_fat_g, fiber_g, sugar_g, cholesterol_mg, sodium_mg, potassium_mg, vitamin_a_daily_pct, vitamin_c_daily_pct, calcium_daily_pct, iron_daily_pct
) values


(3433, 2, DEFAULT, 'white bread', 'https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000', 'a slice', 1, 'a slice', 66, 0.82, 12.65, 1.91, 0.17, 0.17, 0.34, 0.82, 0.6, 1.08, NULL, 
170, NULL, 0, 0, 0, 5)


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