module.exports = {
  weightsToLbs,
  truncateData
};

/********************************************************
 *                     WEIGHTS TO LBS                    *
 ********************************************************/
function weightsToLbs(dataset) {
  return dataset.map(data => {
    data.actual_weight_lbs = kgToLbs(data.actual_weight_kg);
    data.target_goal_weight_lbs = kgToLbs(data.target_goal_weight_kg);

    delete data.actual_weight_kg;
    delete data.target_goal_weight_kg;

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
