const goal_fat_macros_goal_over_time = (
  user_id,
  time_zone,
  start_date,
  end_date
) => {
  //calculates the sql query for: the caloric budget in effect at a given observation_date within the date range from "start date" to "end date"
  // ran by fn in "../caloriesOverTimeDB"
  const daily_applicable_dates = require("./goal_fat_macros_daily_applicable_dates")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  return `
    select 
      d_a_d.user_id,
      d_a_d.observation_date,
      ROUND(ubd.fat_ratio::decimal * 100) as goal_fat_macros
    from ${daily_applicable_dates} as d_a_d
    inner join user_budget_data as ubd
    on 
      d_a_d.user_id = ubd.user_id and
      d_a_d.applicable_date = ubd.applicable_date
    where
      ubd.caloric_budget is not null
    order by
      d_a_d.observation_date
  `;
};

module.exports = goal_fat_macros_goal_over_time;
