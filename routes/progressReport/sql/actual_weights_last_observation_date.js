const actual_weights_last_observation_date = (user_id, time_zone, start_date, end_date) => {
  //calculates "applicable_date" in user_budget_data that corresponds to the applicable record in that table that contains the actual_weight_kg in force at a given observation_date
  const applicable_dates = require("./actual_weights_daily_applicable_dates")(user_id, time_zone, start_date, end_date);
  return `
    (
      select
        MIN(ad.observation_date) as last_observation_date
        --earliest observation date where we have a new applicable date. NB: an actual weight record
      from ${applicable_dates} as ad
      where ad.applicable_date = (select max(d.applicable_date) from ${applicable_dates} as d)
    )
  `;
};

module.exports = actual_weights_last_observation_date;
