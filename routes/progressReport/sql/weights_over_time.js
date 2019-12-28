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

  return `


  select 
    a.user_id,
    a.observation_date,
    a.actual_weight_kg,
    g.goal_weight_kg
  from (${actual_weights_over_time}) as a
  inner join (${goal_weights_over_time}) as g
  on 
    a.user_id = g.user_id AND
    a.observation_date = g.observation_date
  order by
    a.observation_date


  `;
};

module.exports = weights_over_time;
