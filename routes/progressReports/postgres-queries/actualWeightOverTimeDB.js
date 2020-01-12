const { db: pgPromiseDb } = require("../../../data/pg-promise.js");

const actualWeightOverTime = async (user_id, time_zone, start_date, end_date) => {
  //calculates the actual_weight_kg in force at a given observation_date within the date range from "goal start date" to "goal end date"
  const queryString = require("./sql/actual_weights_over_time")(user_id, time_zone, start_date, end_date);
  // console.log(queryString);
  return await pgPromiseDb.any(queryString);
};

module.exports = actualWeightOverTime;
