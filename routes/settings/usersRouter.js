const express = require("express");
const router = express.Router();
const UserInfo = require("./usersDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const {
  heightToImperial,
  kgToLbs,
  macroRatiosToGrams,
  applyLocalOffset,
  calculateConsumption
} = require("./helper");

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
    res.status(500).json({ message: "Failed to update user settings" });
  }
});

/********************************************************
 *                  Macro Endpoints                     *
 ********************************************************/

//Get specific user's macros from user_budget_data table. Returns only fat_ratio, protein_ratio, and carb_ratio
router.get("/:user_id/macro-ratios", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await UserInfo.findMacroRatiosById(user_id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's macro ratios" });
  }
});

//Post new macros to the user_budget_data. 
router.post("/:user_id/macro-ratios", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  const newMacros = req.body;  // const or let, try it

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
});

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
router.post("/:user_id/weight-goal", mapFirebaseIDtoUserID, async (req, res) => {
  const id = req.params.id;
  const newWeightGoal = req.body;
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
});

/********************************************************
 *                Activity Level Endpoints              *
 ********************************************************/

//Get user's activity_level from user_budget_data table.
router.get("/:user_id/activity-level", mapFirebaseIDtoUserID, async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await UserInfo.findActivityLevelById(user_id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's activity level" });
  }
});

//Post new activity_level to user_budget_data table.
router.post("/:user_id/activity-level", mapFirebaseIDtoUserID, async (req, res) => {
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
    res.status(500).json({ message: "Failed to update user's activity level" });
  }
});



/********************************************************
 *                Current Weight Endpoints              *
 ********************************************************/

//Get specific user's budget data from user_metric_history table.
router.get("/:user_id/current-weight", mapFirebaseIDtoUserID, async (req, res) => {
  const { user_id } = req.params;
  try {
    const weight = await UserInfo.findCurrentWeightById(user_id);
    //Calls function from helper file to convert weight in kg to weight in lbs, and adds it to weight obj.
    weight.weight_lbs = kgToLbs(weight.weight_kg);
    res.json(weight);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's current weight" });
  }
});

router.post("/:user_id/current-weight", mapFirebaseIDtoUserID, async (req, res) => {
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
    res.status(500).json({ message: "Failed to update user's current weight" });
  }
});

/********************************************************
 *                       DAILY LOG                       *
 ********************************************************/

// front-end knows the local offset and can display to user GMT+00
// where 00 is the offset in hours

router.get("/daily-log/:date/:local_offset", async (req, res) => {
  // let utc_local_offset = req.params.local_offset;

  let from = new Date(req.params.date); // add offset to both from
  let to = new Date(req.params.date); // and to ** FROM THE FRONT-END **
  to.setDate(to.getDate() + 1);

  try {
    const {
      caloric_budget,
      fat_ratio,
      protein_ratio,
      carb_ratio
    } = await UserInfo.getCaloricBudget(1); // 1 represents user_id

    let dailyLog = await UserInfo.getDailyLog(1, from, to);

    dailyLog = applyLocalOffset(dailyLog);

    let {
      caloriesConsumed,
      fatsConsumed,
      carbsConsumed,
      proteinConsumed
    } = calculateConsumption(dailyLog);

    const { fatBudget, proteinBudget, carbBudget } = macroRatiosToGrams(
      caloric_budget,
      fat_ratio,
      protein_ratio,
      carb_ratio
    );

    res.status(200).json({
      caloricBudget: Math.round(caloric_budget),
      caloriesConsumed,
      fatBudget,
      fatsConsumed,
      carbBudget,
      carbsConsumed,
      proteinBudget,
      proteinConsumed,
      dailyLog
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      err
    });
  }
});

module.exports = router;

/*
  FRONT-END THINGS:

  const date = new Date();
  const offsetMinutes = new Date().getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offsetMinutes);
*/
