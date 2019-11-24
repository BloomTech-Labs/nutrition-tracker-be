const express = require("express");
const axios = require("axios");
const cors = require("cors");
const CircularJSON = require("circular-json");
const oathQueryBuilder = require("./oauthQueryBuilder");

const router = express.Router();

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get("/fatsecret/get-food/:food_id", async (req, res) => {
  const foodID = req.params.food_id;
  const method = "food.get";

  oathQueryBuilder({ method, food_id: foodID })
    .get()
    .then(response => {
      const food_data = response.data.food;
      const serving_measures = food_data.servings.serving;
      const denormalizeFoodData = s => {
        // 's' argument stands for the serving we're work with
        const data_first_pass = {
          fatsecret_food_id: food_data.food_id,
          //  retrieved_at: ... // automatically generated
          food_name: food_data.food_name,
          serving_id: s.serving_id,
          serving_url: s.serving_url,
          serving_desc: s.serving_description,
          metric_serving_amt: s.metric_serving_amount,
          metric_serving_unit: s.metric_serving_unit,

          // all fields that are being returned by fatsecret can be found here:
          // https://platform.fatsecret.com/api/Default.aspx?screen=rapiref&method=food.get

          // start macros. these are guaranteed to be in data
          calories_kcal: s.calories,
          carbs_g: s.carbohydrate,
          fat_g: s.fat,
          protein_g: s.protein,
          // conditionally setting values for the serving's micronutrient values
          // if they've been provided by fatsecret
          // we also are renaming the values to match our database schema
          // for more details on how this operation works & what the syntax means, see this
          // stackoverflow answer: https://stackoverflow.com/a/40560953/2865345 or this medium
          // post which was written to explain using the functionality in that stackoverflow answer"
          ...(s.saturated_fat && { saturated_fat_g: s.saturated_fat }),
          ...(s.polyunsaturated_fat && {
            polyunsaturated_fat_g: s.polyunsaturated_fat
          }),
          ...(s.monounsaturated_fat && {
            monounsaturated_fat_g: s.monounsaturated_fat
          }),
          ...(s.trans_fat && { trans_fat_g: s.trans_fat }),
          ...(s.cholesterol && { cholesterol_mg: s.cholesterol }),
          ...(s.sodium && { sodium_mg: s.sodium }),
          ...(s.potassium && { potassium_mg: s.potassium }),
          ...(s.fiber && { fiber_g: s.fiber }),
          ...(s.sugar && { sugar_g: s.sugar }),
          ...(s.vitamin_a && { vitamin_a_daily_pct: s.vitamin_a }),
          ...(s.vitamin_c && { vitamin_c_daily_pct: s.vitamin_c }),
          ...(s.calcium && { calcium_daily_pct: s.calcium }),
          ...(s.iron && { iron_daily_pct: s.iron })
        }; // denormalize food data by repeating food id and name for each serving measure record
        const {
          measurement_description,
          number_of_units,
          ...without_extra_attributes
        } = data_first_pass; //excludes measurement_description, number_of_units
        return without_extra_attributes;
      };
      let flattened_food_data = Array.isArray(serving_measures)
        ? serving_measures.map(denormalizeFoodData)
        : [denormalizeFoodData(serving_measures)];
      res.send(flattened_food_data);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/fatsecret/search-food/:search_expression", async (req, res) => {
  const searchExpression = req.params.search_expression;
  const method = "foods.search";

  oathQueryBuilder({
    method,
    search_expression: encodeURIComponent(searchExpression),
    max_results: 10
  })
    .get()
    .then(response => {
      const results_list = response.data.foods.food;

      const calorie_regexp = /.+calories.*\s([0-9]+)k?cal\s.+/i;
      const amount_regexp = /.*per\s(.+)\s-\scalories/i;

      const endpoint_results = results_list.map(e => {
        return {
          food_name: e.food_name,
          food_id: e.food_id,
          calories: parseInt(calorie_regexp.exec(e.food_description)[1]),
          standard_amount: amount_regexp.exec(e.food_description)[1]
          // standard amount is the "human" amount that corresponds to the calories above that come with the results
        };
      });

      res.send(endpoint_results);
    })
    .catch(error => {
      console.log(error);
    });

  // res.status(200).send(response);
});

module.exports = router;
