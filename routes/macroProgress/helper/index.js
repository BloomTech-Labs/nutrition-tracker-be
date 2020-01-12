const moment = require("moment-timezone");

module.exports = {
  weightsToLbs,
  truncateData,
  extendDate,
  formatDates
};

/********************************************************
 *                     WEIGHTS TO LBS                    *
 ********************************************************/
function weightsToLbs(dataset, type) {
  const propertyName =
    type === "actuals" ? "actual_weight" : "target_goal_weight";

  return dataset.map(data => {
    data[`${propertyName}_lbs`] = kgToLbs(data[`${propertyName}_kg`]);
    delete data[`${propertyName}_kg`];
    return data;
  });
}

function formatDates(dataset) {
  return dataset.map(data => {
    data.observation_date = moment(data.observation_date).format("MM/DD");
    return data;
  });
}

/********************************************************
 *                       KG TO LBS                       *
 ********************************************************/
function kgToLbs(kg) {
  return Math.round(kg * 2.2046226218 * 100) / 100;
}

/********************************************************
 *                     TRUNCATE DATA                    *
 ********************************************************/
function truncateData(dataset, period, type) {
  let interval, cutoff;

  switch (period) {
    case "weekly":
      interval = 1;
      cutoff = type === "targets" ? -10 : -7;
      break;
    case "monthly":
      interval = 3;
      cutoff = type === "targets" ? -39 : -30;
      break;
    case "quarterly":
      interval = 6;
      cutoff = type === "targets" ? -108 : -90;
      break;
    case "biannual":
      interval = 20;
      cutoff = type === "targets" ? -240 : -180;
      break;
    default:
      interval = 7;
      cutoff = type === "targets" ? -10 : -7;
  }

  return dataset.slice(cutoff).filter((_, i) => i % interval === 0);
}

function extendDate(date, period) {
  switch (period) {
    case "weekly":
      date = moment(date)
        .add(3, "days")
        .utc()
        .format();
      break;
    case "monthly":
      date = moment(date)
        .add(9, "days")
        .utc()
        .format();
      break;
    case "quarterly":
      date = moment(date)
        .add(18, "days")
        .utc()
        .format();
      break;
    case "biannual":
      date = moment(date)
        .add(60, "days")
        .utc()
        .format();
      break;
    default:
      date = moment(date)
        .add(3, "days")
        .utc()
        .format();
  }
  return date;
}
