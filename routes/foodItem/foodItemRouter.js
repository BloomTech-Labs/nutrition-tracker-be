const express = require("express");
const db = require("./foodItemDB");
const fetch = require("node-fetch");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");

router = express.Router();

const checkStatus = res => {
  //Error Check
  if (res.ok) {
    return res;
  } else {
    throw new Error(`Request Failed: ${res.statusText}`);
  }
};

router.get(
  "/getfooditem/:foodlogID/user/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const { user_id, foodlogID } = req.params;

    try {
      const [foodItem] = await db.getFoodItem(foodlogID, user_id);
      const { fatsecret_food_id } = foodItem;
      //now that we have our data from the db we need to go and get the fatsecret_food_id for this record and return that info.
      try {
        var data;
        await fetch(
          `http://localhost:4000/fatsecret/get-food/${fatsecret_food_id}` //make a fetch request from our api and and get info
        )
          .then(checkStatus)
          .then(res => res.json())
          .then(json => (data = json)); // json is the actaul data being returned from out api call
        const dataAtIndexOne = data[0];
        res.status(200).json({ ...dataAtIndexOne, ...foodItem }); // return the api call json data and combine with local db data
      } catch ({ message }) {
        res.status(404).json(message);
      }
      //now we that we have that data from the end point we we need to spread in out data from the first call
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

router.put(
  "/updatefooditem/:foodLogID/user/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
  
    const { foodLogID, user_id } = req.params;
    const updatedRecord = req.body;

    try {
      //call to db to update item;
      const item = await db.updateFoodItem(foodLogID, user_id, updatedRecord);
      res.status(201).json(item);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
);

router.delete("/deletefooditem/:foodLogID/user/:user_id",mapFirebaseIDtoUserID,async (req, res) => {
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
