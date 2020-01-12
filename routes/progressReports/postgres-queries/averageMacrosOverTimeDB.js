const { db: pgPromiseDb } = require("../../../data/pg-promise.js");

const averageMacrosOverTime = async (user_id, start_date) => {
  //calculates the actual_weight_kg in force at a given observation_date within the date range from "goal start date" to "goal end date"
  const queryString = require("./sql/average_macros_over_time")(
    user_id,
    start_date
  );
  console.log(queryString);
  return await pgPromiseDb.any(queryString);
};

module.exports = averageMacrosOverTime;
