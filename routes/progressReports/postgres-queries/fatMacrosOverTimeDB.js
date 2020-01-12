const { db: pgPromiseDb } = require("../../../data/pg-promise.js");

const fatMacrosOverTime = async (user_id, time_zone, start_date, end_date) => {
  //calculates the actual calories consumed and caloric budgets in effect on a given observation_date within the date range from "start date" to "end date"
  const queryString = require("./sql/fat_macros_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  // console.log(queryString);
  return await pgPromiseDb.any(queryString);
};

module.exports = fatMacrosOverTime;
