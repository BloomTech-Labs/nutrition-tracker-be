const goal_weights_daily_applicable_dates = (user_id, time_zone, start_date, end_date) => {
  //calculates "applicable_date" in user_budget_data that corresponds to the applicable record in that table that contains the goal_weight_kg in force at a given observation_date
  const observation_dates = require("./observation_dates_with_eod")(time_zone, start_date, end_date);
  const user_id_applicable_dates = require("./goal_weights_user_id_applicable_dates")(user_id);
  return `
--START *** goal_weights_daily_applicable_dates
    (
      select 
        uid_ad.user_id,
        od.observation_date,
        od.eod_in_utc,
        MAX(uid_ad.applicable_date) as applicable_date
        -- *latest* applicable_date that's still before the observation_date
      from ${observation_dates} as od
      inner join ${user_id_applicable_dates} as uid_ad
      on 
        uid_ad.applicable_date < od.eod_in_utc
      group by   
        uid_ad.user_id,
        od.observation_date,
        od.eod_in_utc
    )
--END *** goal_weights_daily_applicable_dates
  `;
};

module.exports = goal_weights_daily_applicable_dates;
