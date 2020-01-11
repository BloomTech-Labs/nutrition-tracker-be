const actual_weights_over_time = (user_id, time_zone, start_date, end_date) => {
  //calculates the sql query for: the actual_weight_kg in force at a given observation_date within the date range from "goal start date" to "goal end date"
  // ran by fn in "../weightOverTimeDB"
  const daily_applicable_dates = require("./actual_weights_daily_applicable_dates")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  const last_observation_date = require("./actual_weights_last_observation_date")(
    user_id,
    time_zone,
    start_date,
    end_date
  );
  return `
    select 
      d_a_d.user_id,
      d_a_d.observation_date,
      ubd.actual_weight_kg
    from ${daily_applicable_dates} as d_a_d
    inner join user_budget_data as ubd
    on 
      d_a_d.user_id = ubd.user_id and
      d_a_d.applicable_date = ubd.applicable_date
    where
      ubd.actual_weight_kg is not null AND
      d_a_d.observation_date <= ${last_observation_date}
    order by
    d_a_d.observation_date
  `;
};

module.exports = actual_weights_over_time;
