const express = require("express");
const router = express.Router();
const UserInfo = require("./settingsDB");
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

//Gets all users. For Testing purposes mostly.
router.get("/", async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users" });
  }
});

//Get specific user from users table.
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
 *                  Metric Endpoints                    *
 ********************************************************/

//Get specific user's metric history from user_metric_history table.
router.get("/metrics/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findMetricHistoryById(id);
    //Calls function from helper file to convert weight in kg to weight in lbs, and adds it to user obj.
    user.weight = kgToLbs(user.weight_kg);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's metrics" });
  }
});

//Update specific user's metric history in user_metric_history table.
router.put("/metrics/:id", async (req, res) => {
  const id = req.params.id;
  const updatedSettings = req.body;
  if (!updatedSettings) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const updated = await UserInfo.updateMetrics(updatedSettings, id);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user metrics" });
  }
});

/********************************************************
 *                  Budget Endpoints                    *
 ********************************************************/

//Get specific user's budget data from user_metric_history table.
router.get("/budget/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findBudgetDataById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's budget" });
  }
});

//Update specific user's budget data in user_metric_history table.
router.put("/budget/:id", async (req, res) => {
  const id = req.params.id;
  const updatedSettings = req.body;
  if (!updatedSettings) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const updated = await UserInfo.updateBudgetData(updatedSettings, id);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user's budget" });
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
    console.log(err);
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
