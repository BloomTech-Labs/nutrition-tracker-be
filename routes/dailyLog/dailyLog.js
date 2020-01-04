const express = require("express");
const router = express.Router();
const DailyLog = require("./dailyLogDB.js");
const moment = require("moment-timezone");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID.js");
const {
  macroRatiosToGrams,
  applyTimeZones,
  calculateConsumption,
} = require("./helper/helper.js");

/********************************************************
*                   GET USER/DAILY-LOG                  *
********************************************************/
router.get("/:user_id/:date/:tz_name_current", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id = req.params.user_id;
  const timeZoneNameCurrent = decodeURIComponent(req.params.tz_name_current);
  const date = req.params.date;

  // 'from' and 'to' represent the lower and upper boundaries of a single
  // 24-hour window beginning at time 00:00 of 'date' and ending
  // 00:00 the following day

  //'from' and 'to' are stored as UTC time-stamps, localized
  // below to the user's current time-zone

  const from = moment.tz(date, timeZoneNameCurrent).utc().format();
  const to = moment.tz(date, timeZoneNameCurrent).utc().add(1, "d").format();

  try {
    // fetches all logs between 'from' and 'to' 
    let dailyLog = await DailyLog.getDailyLog(user_id , from, to);

    // totals the calories and macro nutrients from each log
    const {
      caloriesConsumed,
      fatsConsumed,
      carbsConsumed,
      proteinConsumed
    } = calculateConsumption(dailyLog);

    // localizes all UTC time-stamps to their corresponding time-zones stored in the log
    dailyLog = applyTimeZones(dailyLog, timeZoneNameCurrent);

    res.status(200).json({
      caloriesConsumed,
      fatsConsumed,
      carbsConsumed,
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

/********************************************************
*               GET USER/NUTRITION-BUDGETS              *
********************************************************/
router.get("/:user_id/nutrition-budgets/", mapFirebaseIDtoUserID, async (req, res) => {
  const user_id  = req.params.user_id;
  try {
    const {
      caloric_budget,
      fat_ratio,
      protein_ratio,
      carb_ratio
    } = await DailyLog.getCaloricBudget(user_id);

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

module.exports = router;