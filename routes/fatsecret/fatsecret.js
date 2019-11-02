const express = require('express');
const axios = require('axios');
const cors = require('cors');
const CircularJSON = require('circular-json');
const oathQueryBuilder = require('../../helpers/oauthQueryBuilder');

const router = express.Router();

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get('/fatsecret/get-food/:food_id', async (req, res) => {
  const foodID = req.params.food_id;
  const method = 'food.get';

  oathQueryBuilder({ method, food_id: foodID }).get()
    .then(response => {
      console.log("response", response.params);
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

  const queryParams = [
    ...getOauthParameters(),
    ['format', 'json'].join('='),
    ['max_results', 10].join('='),
    ['method', method].join('='),
    ['search_expression', encodeURIComponent(searchExpression)].join('=')
  ].sort((a, b) => a.localeCompare(b));

  const sha = signRequest(queryParams);

  queryParams.push(['oauth_signature', sha].join('='));
  axios
    .get(`${API_PATH}?${queryParams.join('&')}`)
    .then(response => {
      let json = CircularJSON.stringify(response);
      res.send(json);
    })
    .catch(error => {
      console.log(error);
    });

  // res.status(200).send(response);
});

module.exports = router;
