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
    aw_ot.user_id,
    aw_ot.observation_date,
    aw_ot.actual_weight_kg,
    round(
        gw_ot.goal_weight_kg - gr_ot.goal_daily_weight_kg_change_rate * 
        (gw_ot.goal_end_date::date - gw_ot.observation_date::date) --number of days remaining to goal end date
      , 2
    ) as target_goal_weight_kg
  from (${actual_weights_over_time}) as aw_ot
  inner join (${goal_weights_over_time}) as gw_ot
  on 
    aw_ot.user_id = gw_ot.user_id AND
    aw_ot.observation_date = gw_ot.observation_date
  inner join (${goal_rates_over_time}) as gr_ot
  on 
    aw_ot.user_id = gr_ot.user_id AND
    aw_ot.observation_date = gr_ot.observation_date
  order by
    aw_ot.observation_date


  `;
};

module.exports = weights_over_time;
