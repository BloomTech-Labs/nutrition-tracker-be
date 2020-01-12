const { db: pgPromiseDb } = require("../../../data/pg-promise.js");

const actualCaloriesOverTimeDB = async (user_id, start_date, end_date) => {
  //calculates the actual calories consumed on a given observation_date within the date range from "goal start date" to "goal end date"
  const queryString = require("./sql/actual_calories_over_time")(user_id, start_date, end_date);
  // console.log(queryString);
  return await pgPromiseDb.any(queryString);
};

module.exports = actualCaloriesOverTimeDB;
