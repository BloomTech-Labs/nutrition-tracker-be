const carbs_macros_over_time = (user_id, time_zone, start_date, end_date) => {
  actual_carbs_macros_over_time = require("./actual_carbs_macros_over_time")(
    user_id,
    start_date,
    end_date
  );

  goal_carbs_macros_goal_over_time = require("./goal_carbs_macros_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  return `
    select 
      acm_ot.user_id,
      acm_ot.observation_date,
      acm_ot.actual_carbs_macros,
      gcm_ot.goal_carbs_macros
    from (${actual_carbs_macros_over_time}) as acm_ot
    inner join (${goal_carbs_macros_goal_over_time}) as gcm_ot
    on 
      acm_ot.user_id = gcm_ot.user_id AND
      acm_ot.observation_date = gcm_ot.observation_date
    order by
      acm_ot.observation_date
  `;
};

module.exports = carbs_macros_over_time;
