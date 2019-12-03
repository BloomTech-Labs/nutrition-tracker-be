const express = require("express");
const router = express.Router();
const UserInfo = require("./usersDB");
const moment = require("moment-timezone");

const {
  heightToImperial,
  macroRatiosToGrams,
  applyTimeZones,
  calculateConsumption,
  kgToLbs,
} = require("./helper");

/********************************************************
 *                   User Endpoints                     *
 ********************************************************/

//Get specific user from users table.
router.get("/settings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findByUserId(id);
    //Calls function from helper file to convert height in cm to height in ft/inches, and adds it to user obj.
    user.height = heightToImperial(user.height_cm);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users" });
  }
});

//Update specific user in users table.
router.put("/settings/:id", async (req, res) => {
  const id = req.params.id;
  const updatedSettings = req.body;
  if (!updatedSettings) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const updated = await UserInfo.updateUser(updatedSettings, id);
    res.status(201).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user settings" });
  }
});

/********************************************************
 *                  Macro Endpoints                     *
 ********************************************************/

//Get specific user's metric history from user_metric_history table.
router.get("/macro-ratios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findMacroRatiosById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's macro ratios" });
  }
});

router.post("/macro-ratios/:id", async (req, res) => {
  const id = req.params.id;
  const newMacros = req.body;
  if (!newMacros) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const added = await UserInfo.addMacroRatios(newMacros);
    res.status(201).json(added);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update use's macro ratios" });
  }
});

/********************************************************
 *                Weight Goal Endpoints                 *
 ********************************************************/

//Get specific user's metric history from user_metric_history table.
router.get("/weight-goal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findWeightGoalById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's weight goal" });
  }
});

router.post("/weight-goal/:id", async (req, res) => {
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
    console.log(err)
    res.status(500).json({ message: "Failed to update user's weight goal" });
  }
});

/********************************************************
 *                Current Weight Endpoints              *
 ********************************************************/

//Get specific user's budget data from user_metric_history table.
router.get("/current-weight/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const weight = await UserInfo.findCurrentWeightById(id);
    res.json(weight);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's current weight" });
  }
});

router.post("/current-weight/:id", async (req, res) => {
  const newCurrentWeight = req.body;
  if (!newCurrentWeight) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const added = await UserInfo.addCurrentWeight(newCurrentWeight);
    res.status(201).json(added);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update user's current weight" });
  }
});

/********************************************************
*               GET USER/NUTRITION-BUDGETS              *
********************************************************/
router.get("/nutrition-budgets", async (req, res) => {
  try {
    const {
      caloric_budget,
      fat_ratio,
      protein_ratio,
      carb_ratio
    } = await UserInfo.getCaloricBudget(1);

    const { fatBudget, proteinBudget, carbBudget } = macroRatiosToGrams(
      caloric_budget,
      fat_ratio,
      protein_ratio,
      carb_ratio
    );

    res.status(200).json({
      caloricBudget: Math.round(caloric_budget),
      fatBudget,
      carbBudget,
      proteinBudget
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
      err
    });
  }
});

/********************************************************
*                   GET USER/DAILY-LOG                  *
********************************************************/
router.get("/daily-log/:date/:tz_name_current", async (req, res) => {
  const timeZoneNameCurrent = decodeURIComponent(req.params.tz_name_current);
  const date = req.params.date;
  // 'from' and 'to' represent the upper and lower boundaries of a single
  // 24-hour time-span beginning at time 00:00 of 'date' and ending
  // 00:00 the following day, and are stored as UTC time-stamps, localized
  // to the user's current time-zone
  const from = moment.tz(date, timeZoneNameCurrent).utc().format();
  const to = moment.tz(date, timeZoneNameCurrent).utc().add(1, "d").format();

  try {
    // fetches all logs between 'from' and 'to' 
    let dailyLog = await UserInfo.getDailyLog(1, from, to);

    // calculates the total calories and macro nutrients from each log
    const {
      caloriesConsumed,
      fatsConsumed,
      carbsConsumed,
      proteinConsumed
    } = calculateConsumption(dailyLog);

    // localizes all UTC time-stamps stored in the log
    dailyLog = applyTimeZones(dailyLog, timeZoneNameCurrent);

    res.status(200).json({
      caloriesConsumed,
      fatsConsumed,
      carbsConsumed,
      proteinConsumed,
      dailyLog
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Internal Server Error",
      err
    });
  }
});

/*
  FRONT-END THINGS:

  const date = new Date();
  const offsetMinutes = new Date().getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offsetMinutes);
*/

module.exports = router;
