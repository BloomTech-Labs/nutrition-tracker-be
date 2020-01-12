const protein_macros_over_time = (user_id, time_zone, start_date, end_date) => {
  actual_protein_macros_over_time = require("./actual_protein_macros_over_time")(
    user_id,
    start_date,
    end_date
  );
  goal_protein_macros_over_time = require("./goal_protein_macros_over_time")(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  return `


    select 
      apm_ot.user_id,
      apm_ot.observation_date,
      apm_ot.actual_protein_macros,
      gpm_ot.goal_protein_macros
    from (${actual_protein_macros_over_time}) as apm_ot
    inner join (${goal_protein_macros_over_time}) as gpm_ot
    on 
      apm_ot.user_id = gpm_ot.user_id AND
      apm_ot.observation_date = gpm_ot.observation_date
    order by
      apm_ot.observation_date


  `;
};

module.exports = protein_macros_over_time;
