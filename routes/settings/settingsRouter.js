const express = require("express");
const router = express.Router();
const UserInfo = require("./settingsDB");

router.get("/", async (req, res) => {
  try {
    const users = await UserInfo.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserInfo.findById(id);
    user.height = heightToImperial(user.height_cm);

    res.json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedSettings = req.body;
  if (!updatedSettings) {
    res.status(400).json({
      message: "Item required for update are missing"
    });
  }
  try {
    const updated = await UserInfo.updateUserSettings(updatedSettings, id);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user settings" });
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

    let {caloriesConsumed, fatsConsumed, carbsConsumed, proteinConsumed} = calculateConsumption(dailyLog);

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

// consider refactoring  with moment-js
function applyLocalOffset(dailyLog) {
  dailyLog.forEach(log => { 
    let time_consumed_at_utc;
    let time_consumed_at_local;
    let time_consumed_at_local_hour;
    let time_consumed_at_local_minute;
    let time_consumed_at_local_period;

    time_consumed_at_utc = new Date(log.time_consumed_at);

    time_consumed_at_local = time_consumed_at_utc.setSeconds(
      time_consumed_at_utc.getSeconds() + log.utc_offset_seconds * -1
    );

    time_consumed_at_local = new Date(time_consumed_at_local);
    time_consumed_at_local_hour = Number(time_consumed_at_local .getHours()) + 1;
    time_consumed_at_local_minute = Number(time_consumed_at_local .getMinutes());
    time_consumed_at_local_period;

    if (time_consumed_at_local_hour >= 12) {
      time_consumed_at_local_hour = time_consumed_at_local_hour % 12;
      time_consumed_at_local_period = "pm";
    } else {
      time_consumed_at_local_period = "am";
    }

    if (time_consumed_at_local_minute < 10) {
      time_consumed_at_local_minute = `0${time_consumed_at_local_minute}`;
    }

    log.time_consumed_at = `${time_consumed_at_local_hour}:${time_consumed_at_local_minute}${time_consumed_at_local_period}`;
  });

  return dailyLog;
}

function calculateConsumption(dailyLog) {
  let caloriesConsumed = 0;
  let fatsConsumed = 0;
  let carbsConsumed = 0;
  let proteinConsumed = 0;

  dailyLog.forEach(log => {
    caloriesConsumed += Number(log.calories_kcal) * Number(log.quantity);
    fatsConsumed += Number(log.fat_g) * Number(log.quantity);
    carbsConsumed += Number(log.carbs_g) * Number(log.quantity);
    proteinConsumed += Number(log.protein_g) * Number(log.quantity);
  })

  return {
    caloriesConsumed: Math.round(caloriesConsumed),
    fatsConsumed: Math.round(fatsConsumed),
    carbsConsumed: Math.round(carbsConsumed),
    proteinConsumed: Math.round(proteinConsumed)
  }
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

module.exports = router;

/*
  FRONT-END SHIT:

  const date = new Date();
  const offsetMinutes = new Date().getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offsetMinutes);
*/
