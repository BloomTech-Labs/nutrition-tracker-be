const goal_rates_over_time = (user_id, time_zone, start_date, end_date) => {
  //calculates the sql query for: the v in force at a given observation_date within the date range from "goal start date" to "goal end date"
  const goal_rates_daily_applicable_dates = require("./goal_weights_daily_applicable_dates")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  return `
    select 
      d.user_id,
      d.observation_date,
      ubd.goal_weekly_weight_change_rate * 0.45359237 / 7 as goal_daily_weight_kg_change_rate
    from ${goal_rates_daily_applicable_dates} -- as d
    inner join user_budget_data as ubd
    on 
      d.user_id = ubd.user_id and
      d.applicable_date = ubd.applicable_date
    where
      ubd.goal_weekly_weight_change_rate is not null
    order by
      d.observation_date
  `;
};

module.exports = goal_rates_over_time;
