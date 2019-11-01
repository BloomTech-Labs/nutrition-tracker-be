require('dotenv').config();
const express = require('express');
const request = require('request');
const axios = require('axios');
const hmacsha1 = require('hmacsha1');
const cors = require('cors');
const CircularJSON = require('circular-json');

const router = express.Router();

server.use(cors());
server.use(express.json());

/********************************************************
 *                 FATSECRET - FOOD.GET                 *
 ********************************************************/
router.get('/fatsecret/get-food/:food_id', async (req, res) => {
  const foodID = req.params.food_id;
  const method = 'food.get';

  fsAxios({ method, food_Id: foodID })
    .then(response => {
      let json = CircularJSON.stringify(response);
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
