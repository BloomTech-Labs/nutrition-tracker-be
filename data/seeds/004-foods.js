exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE foods RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("foods").insert([
        {
          fatsecret_food_id: 3433,
          serving_id: 10690,
          food_name: "white bread",
          serving_desc: "a slice",
          metric_serving_amt: 1,
          metric_serving_unit: "a slice",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 1),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 4881,
          serving_id: 17170,
          food_name: "cheese pizza",
          serving_desc: "a slice",
          metric_serving_amt: 1,
          metric_serving_unit: "a slice",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 25),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 1641,
          serving_id: 5034,
          food_name: "chicken breast",
          serving_desc: "one",
          metric_serving_amt: 1,
          metric_serving_unit: "one",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 20),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 8372,
          serving_id: 8653,
          food_name: "salmon",
          serving_desc: "1oz boneless",
          metric_serving_amt: 1,
          metric_serving_unit: "one",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 28),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 8372,
          serving_id: 17424,
          food_name: "cheese pizza",
          serving_desc: "a slice",
          metric_serving_amt: 1,
          metric_serving_unit: "a slice",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 1),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 1641,
          serving_id: 5035,
          food_name: "chicken breast",
          serving_desc: "one",
          metric_serving_amt: 1,
          metric_serving_unit: "one",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 5),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 2057,
          serving_id: 8653,
          food_name: "salmon",
          serving_desc: "1oz boneless",
          metric_serving_amt: 1,
          metric_serving_unit: "one",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 23),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        },
        {
          fatsecret_food_id: 2057,
          serving_id: 6814,
          food_name: "salmon",
          serving_desc: "1oz boneless",
          metric_serving_amt: 1,
          metric_serving_unit: "one",
          retrieved_at: new Date(new Date() - 1000 * 60 * 60 * 28),
          serving_url:
            "https://www.fatsecret.com/calories-nutrition/generic/pizza-cheese?portionid=17170&portionamount=1.000", // not actually the correct url. just there to make sure the field works.
          calories_kcal: 66,
          fat_g: 0.82,
          trans_fat_g: 0.82,
          saturated_fat_g: 0.17,
          monounsaturated_fat_g: 0.17,
          polyunsaturated_fat_g: 0.339,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170,
          vitamin_a_daily_pct: 0,
          vitamin_c_daily_pct: 0,
          iron_daily_pct: 5,
          calcium_daily_pct: 0
        }
      ]);
    });
};
