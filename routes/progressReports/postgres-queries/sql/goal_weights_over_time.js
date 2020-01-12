const goal_weights_over_time = (user_id, time_zone, start_date, end_date) => {
  //calculates the sql query for: the goal_weight_kg in force at a given observation_date within the date range from "goal start date" to "goal end date"
  // ran by fn in "../weightOverTimeDB"
  const daily_applicable_dates = require("./goal_weights_daily_applicable_dates")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  return `
    select 
      d_a_d.user_id,
      d_a_d.observation_date,
      ubd.goal_weight_kg,
      ubd.goal_end_date
    from ${daily_applicable_dates} as d_a_d
    inner join user_budget_data as ubd
    on 
      d_a_d.user_id = ubd.user_id and
      d_a_d.applicable_date = ubd.applicable_date
    where
      ubd.goal_weight_kg is not null AND
      ubd.goal_end_date > d_a_d.eod_in_utc
    order by
      d_a_d.observation_date
  `;
};

module.exports = goal_weights_over_time;

/*



*/
