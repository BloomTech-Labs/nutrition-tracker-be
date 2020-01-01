const weights_over_time = (user_id, time_zone, start_date, end_date) => {
  actual_weights_over_time = require("./actual_weights_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  goal_weights_over_time = require("./goal_weights_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  goal_rates_over_time = require("./goal_rates_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  return `


  select 
    a.user_id,
    a.observation_date,
    a.actual_weight_kg,
    round(
      g.goal_weight_kg - r.goal_daily_weight_kg_change_rate * 
        (g.goal_end_date::date - a.observation_date::date) --number of days remaining to goal end date
      , 2
    ) as target_goal_weight_kg
  from (${actual_weights_over_time}) as a
  inner join (${goal_weights_over_time}) as g
  on 
    a.user_id = g.user_id AND
    a.observation_date = g.observation_date
  inner join (${goal_rates_over_time}) as r
  on 
    a.user_id = r.user_id AND
    a.observation_date = r.observation_date
  order by
    a.observation_date


  `;
};

module.exports = weights_over_time;
