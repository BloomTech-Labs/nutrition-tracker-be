const express = require("express");
const moment = require("moment-timezone");
const router = express.Router();
const UserInfo = require("./settingsDB");

/********************************************************
*                        GET USER/                      *
********************************************************/
router.get("/settings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findByUserId(id);
    user.height = heightToImperial(user.height_cm);

    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

/********************************************************
*                        PUT USER/                      *
********************************************************/
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
    res.status(500).json({ message: "Failed to update user settings" });
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
  // 24-hour time-span beginning at time 00:00 of date and ending
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
    res.status(500).json({
      errorMessage: "Internal Server Error",
      err
    });
  }
});

/********************************************************
*                      HELPER FUNCTIONS                 *
********************************************************/
function macroRatiosToGrams(
  caloric_budget,
  fat_ratio,
  protein_ratio,
  carb_ratio
) {
  const fatBudget = Math.round(caloric_budget * fat_ratio / 9);
  const proteinBudget = Math.round(caloric_budget * protein_ratio / 4);
  const carbBudget = Math.round(caloric_budget * carb_ratio / 4);

  return { fatBudget, proteinBudget, carbBudget };
}

function applyTimeZones(dailyLog, timeZoneNameCurrent) {
  // loops through each log within a 24-hour time-span
  dailyLog.forEach(log => {
    // if the user's current time-zone is different from 
    // that which is stored in the log
    if (timeZoneNameCurrent !== log.timeZoneName) {

      // creates three properties on the log to denote the time consumed localized to
      // the user's current time-zone, as well as the current time-zone name and abbreviation
      log.timeConsumedAtHere = applyTimeZoneOffset(log.timeConsumedAt, timeZoneNameCurrent)
      log.timeZoneHereName = timeZoneNameCurrent;
      log.timeZoneHereAbbr = moment.tz(log.timeConsumedAt, timeZoneNameCurrent).format("z");

      // creates three properties on the log to denote the time consumed localized to
      // the user's time-zone at the time of logging, as well as the time-zone name 
      // and abbreviation
      log.timeConsumedAtThere = applyTimeZoneOffset(
        log.timeConsumedAt,
        log.timeZoneName
      );
      log.timeZoneThereName = log.timeZoneName;
      log.timeZoneThereAbbr = log.timeZoneAbbr;

      // flags the log as having two, unique, time-zoned entries
      log.hasTimeZoneDifference = true;

      // deletes properties that won't be used by the client-side application
      delete log.timeConsumedAt;
      delete log.timeZoneName;
      delete log.timeZoneAbbr;

    } else { // if the user's current time-zone matches that which is stored in the log

      // updates the timeConsumedAt property to return back the UTC time 
      // localized to the time-zone that the user recorded the log
      log.timeConsumedAt = applyTimeZoneOffset(
        log.timeConsumedAt,
        log.timeZoneName
      );
    }
  });

  // localizes a UTC-time to a provided time-zone
  function applyTimeZoneOffset(timeUTC, timeZoneName) {
    let timeConsumedUTC = moment.utc(timeUTC);
    return moment.tz(timeConsumedUTC, timeZoneName).format();
  }

  return dailyLog;
}

function calculateConsumption(dailyLog) {
  let caloriesConsumed = 0;
  let fatsConsumed = 0;
  let carbsConsumed = 0;
  let proteinConsumed = 0;

  dailyLog.forEach(log => {
    caloriesConsumed += Number(log.caloriesKcal) * Number(log.quantity);
    fatsConsumed += Number(log.fatGrams) * Number(log.quantity);
    carbsConsumed += Number(log.carbsGrams) * Number(log.quantity);
    proteinConsumed += Number(log.proteinGrams) * Number(log.quantity);
  });

  return {
    caloriesConsumed: Math.round(caloriesConsumed),
    fatsConsumed: Math.round(fatsConsumed),
    carbsConsumed: Math.round(carbsConsumed),
    proteinConsumed: Math.round(proteinConsumed)
  };
}

function heightToImperial(n) {
  const height = [];
  var realFeet = n * 0.3937 / 12;
  var convFeet = Math.floor(realFeet);
  var convInches = Math.round((realFeet - convFeet) * 12);
  height.push({
    feet: convFeet,
    inches: convInches
  });
  return height;
}

// function groupByInterval(dailyLog, interval) {
//   let timeConsumed, intervalStart, intervalEnd, inclusivity;
//   let groupIndex = -1;
//   let groupedDailyLog = [[]];

//   dailyLog.forEach((log, i) => {
//     timeConsumed = log.time_consumed_at;
//     if (
//       !timeConsumed.isBetween(intervalStart, intervalEnd, null, inclusivity) ||
//       i === 0
//     ) {
//       intervalStart = getIntervalStart(timeConsumed, interval);
//       intervalEnd = getIntervalEnd(timeConsumed, interval);
//       inclusivity = timeConsumed.isSame(intervalEnd) ? "[]" : "[)";

//       log.time_consumed_at = timeConsumed.format("h:mma");
//       log.interval_start = intervalStart.format("h:mma");

//       groupedDailyLog[++groupIndex] = [log];
//     } else {
//       log.time_consumed_at = timeConsumed.format("h:mma");
//       log.time_interval = intervalStart.format("h:mma");
//       groupedDailyLog[groupIndex].push(log);
//     }
//   });

//   function getIntervalStart(moment, interval) {
//     const roundedMinutes = Math.floor(moment.minute() / interval) * interval;
//     return moment.clone().minute(roundedMinutes).second(0);
//   }

//   function getIntervalEnd(moment, interval) {
//     interval = moment.minute() === interval ? interval * 2 : interval;
//     const roundedMinutes = Math.ceil(moment.minute() / interval) * interval;
//     return moment.clone().minute(roundedMinutes).second(0);
//   }

//   return groupedDailyLog;
// }

module.exports = router;
