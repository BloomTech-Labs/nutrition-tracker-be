const fat_macros_over_time = (user_id, time_zone, start_date, end_date) => {
  actual_fat_macros_over_time = require("./actual_fat_macros_over_time")(
    user_id,
    start_date,
    end_date
  );
  goal_fat_macros_goal_over_time = require("./goal_fat_macros_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  return `


    select 
      afm_ot.user_id,
      afm_ot.observation_date,
      afm_ot.actual_fat_macros,
      gfm_ot.goal_fat_macros
    from (${actual_fat_macros_over_time}) as afm_ot
    inner join (${goal_fat_macros_goal_over_time}) as gfm_ot
    on 
      afm_ot.user_id = gfm_ot.user_id AND
      afm_ot.observation_date = gfm_ot.observation_date
    order by
      afm_ot.observation_date


  `;
};

module.exports = fat_macros_over_time;
