const express = require('express');
const axios = require('axios');
const cors = require('cors');
const CircularJSON = require('circular-json');
const oathQueryBuilder = require('./oauthQueryBuilder');

const router = express.Router();

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get('/fatsecret/get-food/:food_id', async (req, res) => {
  const foodID = req.params.food_id;
  const method = 'food.get';

  oathQueryBuilder({ method, food_id: foodID}).get()
    .then(response => {
      let json = CircularJSON.stringify(response.data);
      res.send(json);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/fatsecret/search-food/:search_expression', async (req, res) => {
  const searchExpression = req.params.search_expression;
  const method = 'foods.search';

  oathQueryBuilder({ method, search_expression: encodeURIComponent(searchExpression), max_results: 10}).get()
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
