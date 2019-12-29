const goal_rates_daily_applicable_dates = (user_id, time_zone, start_date, end_date) => {
  //calculates "applicable_date" in user_budget_data that corresponds to the applicable record in that table that contains the goal_weight_kg in force at a given observation_date
  const dates_in_range = require("./dates_in_range")(time_zone, start_date, end_date);
  const user_id_applicable_dates = require("./goal_weights_user_id_applicable_dates")(user_id);
  return `
    (
      select 
        uid_ad.user_id,
        d_i_r.observation_date,
        MAX(uid_ad.applicable_date) as applicable_date
        -- *latest* applicable_date that's still before the observation_date
      from ${dates_in_range} as d_i_r
      inner join ${user_id_applicable_dates} as uid_ad
      on 
        uid_ad.applicable_date < d_i_r.eod_in_utc
      group by   
        uid_ad.user_id,
        d_i_r.observation_date
    )
  `;
};

module.exports = goal_rates_daily_applicable_dates;
