const calories_over_time = (user_id, time_zone, start_date, end_date) => {
  actual_calories_over_time = require("./actual_calories_over_time")(
    user_id,
    start_date,
    end_date
  );
  goal_calories_over_time = require("./goal_calories_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  console.log(actual_calories_over_time);
  console.log("***********************");
  console.log(goal_calories_over_time);

  return `


    select 
      ac_ot.user_id,
      ac_ot.observation_date,
      ac_ot.total_calories,
      gc_ot.caloric_budget
    from (${actual_calories_over_time}) as ac_ot
    inner join (${goal_calories_over_time}) as gc_ot
    on 
      ac_ot.user_id = gc_ot.user_id AND
      ac_ot.observation_date = gc_ot.observation_date
    order by
      ac_ot.observation_date


  `;
};

module.exports = calories_over_time;
