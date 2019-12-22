const update_weight_goal = (user_id, time_zone) => {
  //subquery strings, with alias; should just need comma as if they're just a "field name" in terms of building a sql string.
  const days_until_goal = require("./days_until_goal")(user_id);

  const result = `
    insert into user_budget_data(user_id, goal_start_date, goal_end_date)
    select 
      ${user_id} as user_id,
      timezone('${time_zone}', current_date)::date as goal_start_date,
      (timezone('${time_zone}', current_date) + (v.days_until_goal * interval '1 day'))::date as goal_end_date
    from ( 
      ${days_until_goal}
    ) as v
    returning *;
  `;

  return result;
};

module.exports = update_weight_goal;
