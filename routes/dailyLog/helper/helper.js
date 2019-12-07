const moment = require("moment-timezone");

module.exports = {
  applyTimeZones,
  calculateConsumption,
  macroRatiosToGrams
};

/********************************************************
*                     APPLY TIMEZONES                   *
********************************************************/
function applyTimeZones(dailyLog, timeZoneNameCurrent) {
  // loops through each log within the daily log
  dailyLog.forEach(log => {
    // if the user's current time-zone is different from
    // that which is stored in the log
    if (timeZoneNameCurrent !== log.timeZoneName) {
      // creates three properties on the log to denote the time consumed localized to
      // the user's current time-zone, as well as the current time-zone name and abbreviation
      log.timeConsumedAtHere = applyTimeZoneOffset(
        log.timeConsumedAt,
        timeZoneNameCurrent
      );
      log.timeZoneHereName = timeZoneNameCurrent;
      log.timeZoneHereAbbr = moment
        .tz(log.timeConsumedAt, timeZoneNameCurrent)
        .format("z");

      // creates three properties on the log to denote the time consumed localized to
      // the user's time-zone AT THE TIME OF LOGGING, as well as the time-zone name
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

      // else if the user's current time-zone matches that which is stored in the log
    } else {

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

/********************************************************
*                 CALCULATE CONSUMPTION                 *
********************************************************/
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

/********************************************************
*                     MACROS TO GRAMS                   *
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