const express = require("express");
const router = express.Router();
const UserInfo = require("./usersDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");

const { heightToImperial, kgToLbs } = require("./helper");

/********************************************************
 *                   User Endpoints                     *
 ********************************************************/

//Get specific user from users table.
router.get("/:user_id", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await UserInfo.findByUserId(user_id);
    //Calls function from helper file to convert height in cm to height in ft/inches, and adds it to user obj.
    user.height = heightToImperial(user.height_cm);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users" });
  }
});

//Update specific user in users table.
router.put("/:user_id", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  const updatedSettings = req.body;
  if (!updatedSettings) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const updated = await UserInfo.updateUser(updatedSettings, user_id);

    res.status(201).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user settings" });
  }
});

/********************************************************
 *                  Macro Endpoints                     *
 ********************************************************/

//Get specific user's macros from user_budget_data table. Returns only fat_ratio, protein_ratio, and carb_ratio
router.get(
  "/:user_id/macro-ratios",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await UserInfo.findMacroRatiosById(user_id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to get user's macro ratios" });
    }
  }
);

//Post new macros to the user_budget_data.
router.post(
  "/:user_id/macro-ratios",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const newMacros = req.body;

    newMacros.user_id = user_id;

    if (!newMacros) {
      res.status(400).json({
        message: "Item required for update are missing"
      });
    }
    try {
      const added = await UserInfo.addMacroRatios(newMacros);
      res.status(201).json(added);
    } catch (err) {
      res.status(500).json({ message: "Failed to update use's macro ratios" });
    }
  }
);

/********************************************************
 *                Weight Goal Endpoints                 *
 ********************************************************/

//Get user's weekly_goal_rate and weight_goal_kg from user_budget_data table.
router.get("/:user_id/weight-goal", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await UserInfo.findWeightGoalById(user_id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's weight goal" });
  }
});

//Post new weekly_goal_rate and/or weight_goal_kg to user_budget_data table.
router.post(
  "/:user_id/weight-goal",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const newWeightGoal = req.body;

    newWeightGoal.user_id = user_id;

    if (!newWeightGoal) {
      res.status(400).json({
        message: "Item required for update are missing"
      });
    }
    try {
      const added = await UserInfo.addWeightGoal(newWeightGoal);
      res.status(201).json(added);
    } catch (err) {
      res.status(500).json({ message: "Failed to update user's weight goal" });
    }
  }
);

/********************************************************
 *                Activity Level Endpoints              *
 ********************************************************/

//Get user's activity_level from user_budget_data table.
router.get(
  "/:user_id/activity-level",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await UserInfo.findActivityLevelById(user_id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to get user's activity level" });
    }
  }
);

//Post new activity_level to user_budget_data table.
router.post(
  "/:user_id/activity-level",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const { user_id } = req.params;
    const activityLevel = req.body;

    activityLevel.user_id = user_id;
    if (!activityLevel) {
      res.status(400).json({
        message: "Item required for update are missing"
      });
    }
    try {
      const added = await UserInfo.addActivityLevel(activityLevel);
      res.status(201).json(added);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to update user's activity level" });
    }
  }
);

/********************************************************
 *                Current Weight Endpoints              *
 ********************************************************/

//Get specific user's weight_kg from the user_metric_history
router.get(
  "/:user_id/current-weight",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const weight = await UserInfo.findCurrentWeightById(user_id);
      //Calls function from helper file to convert weight in kg to weight in lbs, and adds it to weight obj.
      weight.actual_weight_lbs = kgToLbs(weight.actual_weight_kg);
      res.json(weight);
    } catch (err) {
      res.status(500).json({ message: "Failed to get user's current weight" });
    }
  }
);

//Post specific user's weight_kg to the user_metric_history
router.post(
  "/:user_id/current-weight",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const { user_id } = req.params;
    const newCurrentWeight = req.body;
    newCurrentWeight.user_id = user_id;
    if (!newCurrentWeight) {
      res.status(400).json({
        message: "Item required for update are missing"
      });
    }
    try {
      const added = await UserInfo.addCurrentWeight(newCurrentWeight);

      res.status(201).json(added);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update user's current weight"
      });
    }
  }
);

/********************************************************
 *             POST USER/:USER_ID/PROGRESS/WEIGHT        *
 ********************************************************/
/*
  TODO:
    1) flag to the user what date their weight goal was applicable to
        figure out implemented
*/

/*
  const actualWeightOverTime = require("./actualWeightOverTimeDB");
  const goalWeightOverTime = require("./goalWeightOverTimeDB");
  const weightOverTime = require("./weightOverTimeDB");
*/

/*
  goal_weight_kg --> array that plots the slope
  actual_weight_kg ==> array that contains all the data points
  observation dates --> array that gives you the dates to populate on the chart
*/

module.exports = router;
