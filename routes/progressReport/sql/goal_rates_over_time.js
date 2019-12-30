const goal_rates_over_time = (user_id, time_zone, start_date, end_date) => {
  //calculates the sql query for: the v in force at a given observation_date within the date range from "goal start date" to "goal end date"
  const daily_applicable_dates = require("./goal_rates_daily_applicable_dates")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  return `
    select 
      d_a_d.user_id,
      d_a_d.observation_date,
      ubd.goal_weekly_weight_change_rate * 0.45359237 / 7 as goal_daily_weight_kg_change_rate
    from ${daily_applicable_dates} as d_a_d
    inner join user_budget_data as ubd
    on 
      d_a_d.user_id = ubd.user_id and
      d_a_d.applicable_date = ubd.applicable_date
    where
      ubd.goal_weekly_weight_change_rate is not null
    order by
      d_a_d.observation_date
  `;
};

module.exports = goal_rates_over_time;
