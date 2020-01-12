const goal_carbs_macros_daily_applicable_dates = (
  user_id,
  time_zone,
  start_date,
  end_date
) => {
  //calculates "applicable_date" in user_budget_data that corresponds to the applicable record in that table that contains the caloric budget in effect at a given observation_date
  const observation_dates = require("./observation_dates_with_eod")(
    time_zone,
    start_date,
    end_date
  );
  const user_id_applicable_dates = require("./goal_carbs_ratio_user_id_applicable_dates")(
    user_id
  );
  return `
    (
      select 
        uid_ad.user_id,
        od.observation_date,
        MAX(uid_ad.applicable_date) as applicable_date
        -- *latest* applicable_date that's still before the observation_date
      from ${observation_dates} as od
      inner join ${user_id_applicable_dates} as uid_ad
      on 
        uid_ad.applicable_date < od.eod_in_utc
      group by   
        uid_ad.user_id,
        od.observation_date
    )
  `;
};

module.exports = goal_carbs_macros_daily_applicable_dates;
