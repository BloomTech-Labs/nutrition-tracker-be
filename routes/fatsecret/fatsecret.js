const express = require("express");
const oathQueryBuilder = require("./oauthQueryBuilder");
const { to13BarCode } = require("../settings/helper");
const db = require("./getFoods.js");
const { upsertFoods } = require("./upsertFoods.js");

const router = express.Router();

const transformFatSecretData = response => {
  let food_data;
  let serving_measures;
  try {
    food_data = response.data.food;
    serving_measures = food_data.servings.serving;
  } catch (err) {
    console.error({
      err: err,
      message: "Internal Server Error"
    });
  }

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

      retrieved_at: new Date(),

      food_name: food_data.food_name,

      food_type: food_data.food_type,
      brand_name: food_data.brand_name,

      serving_url: s.serving_url,
      serving_desc: s.serving_description, // eg "1/2 cup"
      serving_qty: s.number_of_units, // eg "1/2"
      serving_unit: s.measurement_description, // eg "cup"

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
      saturated_fat_g: s.saturated_fat || null,
      monounsaturated_fat_g: s.monounsaturated_fat || null,
      polyunsaturated_fat_g: s.polyunsaturated_fat || null,
      trans_fat_g: s.trans_fat || null,
      fiber_g: s.fiber || null,
      sugar_g: s.sugar || null,
      sodium_mg: s.sodium || null,
      potassium_mg: s.potassium || null,
      cholesterol_mg: s.cholesterol || null,
      vitamin_a_daily_pct: s.vitamin_a || null,
      vitamin_c_daily_pct: s.vitamin_c || null,
      calcium_daily_pct: s.calcium || null,
      iron_daily_pct: s.iron || null
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

  return flattened_food_data;
};

const getFatSecretData = async (method, food_id) => {
  const fatSecretFoods = await oathQueryBuilder({ method, food_id })
    .get()
    .then(response => {
      return transformFatSecretData(response);
    })
    .catch(error => {
      console.log(error);
    });
  return fatSecretFoods;
};

const getFoodHandler = async (req, res) => {
  const method = "food.get";
  const fatsecretFoodID = req.params.food_id;

  let foods;
  try {
    foods = await db.getServingsByFatsecretFoodId(fatsecretFoodID);

    if (!foods.length) {
      // i am straight up not having a good time!
      // we don't have the food data in our fridge (Foods table), or it's ***NOT FRESH***
      try {
        // grab some ***FRESH*** food
        const fatsecretFoods = await getFatSecretData(method, fatsecretFoodID);
        // UPSERT the fresh food into Foods table
        foods = await upsertFoods(fatsecretFoods);
      } catch (err) {
        res.status(500).json({
          err: err,
          message: "Failed to get food data from Fat Secret"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      err: err,
      message: "Failed to get food data"
    });
  }

  res.send(foods);
};

/********************************************************
 *                 FATSECRET - FOOD.FIND_ID_FOR_BARCODE                 *
 ********************************************************/

router.get("/fatsecret/scanner/get-food/:bar_code", async (req, res) => {
  const barCode = to13BarCode(req.params.bar_code);
  const method = "food.find_id_for_barcode";
  console.log(barCode);
  oathQueryBuilder({
    method,
    barcode: barCode
  })
    .get()
    .then(async response => {
      const fatSecretFoodId = response.data.food_id.value;
      if (fatSecretFoodId === "0") {
        return res.status(404).json({
          message: `No found item found with code ${barCode}`
        });
      }
      let foods;
      try {
        foods = await db.getServingsByFatsecretFoodId(
          parseInt(fatSecretFoodId)
        );

        if (!foods.length) {
          // i am straight up not having a good time!
          // we don't have the food data in our fridge (Foods table), or it's ***NOT FRESH***
          try {
            // grab some ***FRESH*** food
            const fatsecretFoods = await getFatSecretData(
              "food.get",
              parseInt(fatSecretFoodId)
            );

            // UPSERT the fresh food into Foods table
            foods = await upsertFoods(fatsecretFoods);
          } catch (err) {
            res.status(500).json({
              err: err,
              message: "Failed to get food data"
            });
          }
        }
      } catch (err) {
        res.status(500).json({
          err: err,
          message: "Failed to get food data 2"
        });
      }

      res.send(foods);
    })
    .catch(error => {
      console.log(error);
    });

  // res.status(200).send(response);
});

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get("/fatsecret/get-food/:food_id", getFoodHandler);

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

module.exports = { router, getFoodHandler };
