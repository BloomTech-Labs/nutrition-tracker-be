const express = require("express");
const db = require("../logentry/logEntryDB");
const fetch = require("node-fetch");
require("dotenv").config();

const dev = Boolean(process.env.DEV) || false;

const BASE_URL = dev
  ? "http://localhost:4000"
  : "https://nutri-journal.herokuapp.com";

router = express.Router();

const checkStatus = res => {
  if (res.ok) {
    return res;
  } else {
    throw new Error(`Request Failed: ${res.statusText}`);
  }
};

router.get("/getfooditem/:foodlogID", async (req, res) => {
  const { foodlogID } = req.params;

  try {
    const [foodItem] = await db.getLogEntry(foodlogID);
    const { fatsecret_food_id, serving_id } = foodItem;
    //now that we have our data from the db we need to go and get the fatsecret_food_id for this record and return that info.
    try {
      let data;
      let servingArrayData;
      await fetch(
        `https://nutri-journal.herokuapp.com/fatsecret/get-food/${fatsecret_food_id}` //make a fetch request from our api and and get info
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

router.put("/updatefooditem/:foodLogID", async (req, res) => {
  const { foodLogID } = req.params;
  const updatedRecord = req.body;

  try {
    //call to db to update item;
    const item = await db.updateLogEntry(foodLogID, updatedRecord);

    res.status(201).json(item);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.delete("/deletefooditem/:foodLogID", async (req, res) => {
  const { foodLogID } = req.params;

  try {
    // call to db to delete record;
    const deletedRecord = await db.removeLogEntry(foodLogID);
    res.status(200).json(deletedRecord);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

module.exports = router;
