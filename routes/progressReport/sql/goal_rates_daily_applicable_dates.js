const goal_rates_daily_applicable_dates = (user_id, time_zone, start_date, end_date) => {
  //calculates "applicable_date" in user_budget_data that corresponds to the applicable record in that table that contains the goal_weight_kg in force at a given observation_date
  const dates_in_range = require("./dates_in_range")(time_zone, start_date, end_date);
  const goal_rates_user_id_applicable_dates = require("./goal_weights_user_id_applicable_dates")(user_id);
  return `
    (
      select 
        a.user_id,
        d.observation_date,
        MAX(a.applicable_date) as applicable_date
        -- *latest* applicable_date that's still before the observation_date
      from ${dates_in_range} -- as d
      inner join ${goal_rates_user_id_applicable_dates} -- as a
      on 
        a.applicable_date < d.eod_in_utc
      group by   
        a.user_id,
        d.observation_date
    ) as d
  `;
};

module.exports = goal_rates_daily_applicable_dates;
