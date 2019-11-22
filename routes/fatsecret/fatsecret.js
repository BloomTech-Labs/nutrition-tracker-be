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
      let flattened_food_data = serving_measures.map(e => {
        const data_first_pass = {
          food_id: food_data.food_id,
          food_name: food_data.food_name,
          ...e
        }; // flattening food data by repeating food id and name for each serving measure record
        const { serving_url, ...without_extra_attributes } = data_first_pass; //excludes serving url
        return without_extra_attributes;
      });
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
