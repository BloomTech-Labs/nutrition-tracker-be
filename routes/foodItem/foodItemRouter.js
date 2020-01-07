const express = require("express");
const db = require("./foodItemDB");
const fetch = require("node-fetch");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");

const dev = true;
const BASE_URL = dev ? "http://localhost:4000" : "https://nutri-journal.herokuapp.com";

router = express.Router();

const checkStatus = res => {
  //Error Check
  if (res.ok) {
    return res;
  } else {
    throw new Error(`Request Failed: ${res.statusText}`);
  }
};

router.get("/getfooditem/:foodlogID/user/:user_id", mapFirebaseIDtoUserID, async (req, res) => {
  const { user_id, foodlogID } = req.params;

  try {
    const [foodItem] = await db.getFoodItem(foodlogID, user_id);
    const { fatsecret_food_id, serving_id } = foodItem;
    //now that we have our data from the db we need to go and get the fatsecret_food_id for this record and return that info.
    try {
      var data;
      var servingArrayData;
      await fetch(
        `${BASE_URL}/fatsecret/get-food/${fatsecret_food_id}` //make a fetch request from our api and and get info
      )
        .then(checkStatus)
        .then(res => res.json())
        .then(
          json => (
            (servingArrayData = json.map(item => {
              return {
                serving_id: item.serving_id,
                serving_qty: item.serving_qty,
                serving_desc: item.serving_desc,
                fat_g: item.fat_g,
                carbs_g: item.carbs_g,
                protein_g: item.protein_g
              };
            })),
            (data = json.find(item => item.serving_id === serving_id)) //Finds the record from API call to match the serving_description saved in our local DB
          )
        ); // json is the actaul data being returned from out api call
      res.status(200).json({ ...data, ...foodItem, servingArrayData }); // return the api call json data and combine with local db data
    } catch ({ message }) {
      res.status(404).json(message);
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.put("/updatefooditem/:foodLogID/user/:user_id", mapFirebaseIDtoUserID, async (req, res) => {
  const { foodLogID, user_id } = req.params;
  const updatedRecord = req.body;

  let exampleBody = {
    updatedFoodLogRecord: null,

    updatedDailyNutritionTotalsDate: true,
    updatedDailyNutritionTotalsAmount: false,

    changeNutritionalAmounts: {
      total_calories: 140,
      fat_calories: 116,
      carbs_calories: 0,
      protein_calories: 24
    },
    existingNutritionalAmounts: {
      total_calories: 500,
      fat_calories: 400,
      carbs_calories: 10,
      protein_calories: 90
    }
  };

  if (!updatedDailyNutritionTotalsDate && !updatedDailyNutritionTotalsAmount) {
    //do nothing with daily nutrition totals
    //ie the food log entry had its time updated, but not its date
  }

  if (!updatedDailyNutritionTotalsDate && updatedDailyNutritionTotalsAmount) {
    //increase/decrease the amount in daily nutrition totals for the current date
    //upsert the values in {changeNutritionalAmounts}
  }

  if (updatedDailyNutritionTotalsDate && !updatedDailyNutritionTotalsAmount) {
    //decrease the calories etc on the _original_ date in daily nutrition totals
    //by the amount of {existingNutritionalAmounts},
    //aka the amount of the (unchanged in quantity) food log entry
    //upsert the calories of {existingNutritionalAmounts} into the _new_ date
  }

  if (updatedDailyNutritionTotalsDate && updatedDailyNutritionTotalsAmount) {
    //decrease the calories etc on the _original_ date in daily nutrition totals
    //by the amount of {existingNutritionalAmounts},
    //aka the amount of the _original_ food log entry
    //upsert the values in {changeNutritionalAmounts}
    //aka the calories of the _new_ food log entry, into the _new_ date
  }

  let exampleDailyNutritionTotalsData = [
    {
      daily_nutrition_totals_date: "1/6/2020",
      total_calories: 1000,
      fat_calories: 500,
      carbs_calories: 50,
      protein_calories: 450
    },
    {
      daily_nutrition_totals_date: "1/5/2020",
      total_calories: 200,
      fat_calories: 105,
      carbs_calories: 50,
      protein_calories: 45
    }
  ];

  try {
    //call to db to update item;
    const item = await db.updateFoodItem(foodLogID, user_id, updatedRecord);
    res.status(201).json(item);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.delete("/deletefooditem/:foodLogID/user/:user_id", mapFirebaseIDtoUserID, async (req, res) => {
  const { foodLogID, user_id } = req.params;

  try {
    // call to db to delete record;
    const deletedRecord = await db.deleteFoodItem(foodLogID, user_id);
    res.status(200).json(deletedRecord);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

module.exports = router;
