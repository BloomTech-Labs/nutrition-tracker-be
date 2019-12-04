const express = require("express");
const axios = require("axios");
const cors = require("cors");
const CircularJSON = require("circular-json");
const oathQueryBuilder = require("./oauthQueryBuilder");

const db = require("./getFoods.js");

const router = express.Router();

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get("/fatsecret/get-food/:food_id", async (req, res) => {
  const foodID = req.params.food_id;
  const method = "food.get";

  const getFatSecretData = () => {
    const transformFatSecretData = response => {
      const food_data = response.data.food;
      const serving_measures = food_data.servings.serving;

      // denormalizes food data by repeating food id and name, for each serving id
      // 's' argument stands for the serving we're work with
      const denormalizeFoodData = s => {
        // adds in the fields that we're denormalizing for,
        // as well as conditionally includes & renames data
        // that may or may not be present in the fatsecret results
        // but matches the form of our "Foods" table
        const data_first_pass = {
          // START: the fields that we're denormalizing for
          fatsecret_food_id: food_data.food_id,
          serving_id: s.serving_id,

          //  retrieved_at: ... // automatically generated
          food_name: food_data.food_name,
          serving_url: s.serving_url,
          serving_desc: s.serving_description,
          metric_serving_amt: s.metric_serving_amount,
          metric_serving_unit: s.metric_serving_unit,
          // END: the fields that we're denormalizing for

          // all fields that are being returned by fatsecret can be found here:
          // https://platform.fatsecret.com/api/Default.aspx?screen=rapiref&method=food.get

          // start macros. these are guaranteed to be in data
          calories_kcal: s.calories,
          fat_g: s.fat,
          carbs_g: s.carbohydrate,
          protein_g: s.protein,

          // conditionally setting values for the serving's micronutrient values
          // if they've been provided by fatsecret
          // we also are renaming the values to match our database schema
          // for more details on how this operation works & what the syntax means, see this
          // stackoverflow answer: https://stackoverflow.com/a/40560953/2865345 or this medium
          // post which was written to explain using the functionality in that stackoverflow answer"
          ...(s.saturated_fat && { saturated_fat_g: s.saturated_fat }),
          ...(s.monounsaturated_fat && {
            monounsaturated_fat_g: s.monounsaturated_fat
          }),
          ...(s.polyunsaturated_fat && {
            polyunsaturated_fat_g: s.polyunsaturated_fat
          }),
          ...(s.trans_fat && { trans_fat_g: s.trans_fat }),
          ...(s.fiber && { fiber_g: s.fiber }),
          ...(s.sugar && { sugar_g: s.sugar }),
          ...(s.sodium && { sodium_mg: s.sodium }),
          ...(s.potassium && { potassium_mg: s.potassium }),
          ...(s.cholesterol && { cholesterol_mg: s.cholesterol }),
          ...(s.vitamin_a && { vitamin_a_daily_pct: s.vitamin_a }),
          ...(s.vitamin_c && { vitamin_c_daily_pct: s.vitamin_c }),
          ...(s.calcium && { calcium_daily_pct: s.calcium }),
          ...(s.iron && { iron_daily_pct: s.iron })
        };

        // grabs all fields from "first pass" excluding:
        // measurement_description, number_of_units
        // and stores the ones we're interested in,
        // in "without_extra_attributes" constant
        const {
          measurement_description,
          number_of_units,
          ...without_extra_attributes
        } = data_first_pass;

        return without_extra_attributes;
      }; // END denormalizeFoodData() definition

      //    if fatsecret has only one record for given "fatsecret_food_id",
      //  fatsecret returns single object, instead of single-entry array
      //  which includes that object
      //    to make these results consistent for us, we convert the single
      //  object into an array that contains it as its sole element
      //    also in this step, we are passing the fatsecret through
      //  denormalizeFoodData().
      const flattened_food_data = Array.isArray(serving_measures)
        ? serving_measures.map(denormalizeFoodData)
        : [denormalizeFoodData(serving_measures)];

      //  UPSERT into `Foods` table here
      // TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

      return flattened_food_data;
    };

    oathQueryBuilder({ method, food_id: foodID })
      .get()
      .then(response => {
        //  currently we merely send the flattened food data from this endpoint
        //  once we have our "upsert" into "Foods" table working, we may instead
        //  return this data from our table. just notes for future intent to
        //  avoid confusion
        res.send(transformFatSecretData(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const foods = await db.getServingsByFatsecretFoodId(foodID);

  if (foods.length > 0) {
    console.log("ladies and gentlemen: we got him");
  } else {
    //
  }

  getFatSecretData();
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
          // NOTE: standard_amount is a deprecated term, and we may want to change it
          // to be consistent with the naming conventions used in database schema,
          // e.g. "Foods" table
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
