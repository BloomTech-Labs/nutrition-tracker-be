const moment = require("moment-timezone");

module.exports = {
  weightsToLbs,
  truncateData,
  extendDate
};

/********************************************************
 *                     WEIGHTS TO LBS                    *
 ********************************************************/
function weightsToLbs(dataset, type) {
  const propertyName = type === "actuals" ? "actual_weight" : "goal_weight";

  return dataset.map(data => {
    data[`${propertyName}_lbs`] = kgToLbs(data[`${propertyName}_kg`]);
    delete data[`${propertyName}_kg`];
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
function truncateData(dataset, period) {
  let interval, cutoff;

  switch (period) {
    case "weekly":
      interval = 1;
      cutoff = -7;
      break;
    case "monthly":
      interval = 3;
      cutoff = -30;
      break;
    case "quarterly":
      interval = 6;
      cutoff = -90;
      break;
    case "biannual":
      interval = 20;
      cutoff = -180;
      break;
    default:
      interval = 7;
      cutoff = -7;
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
