const update_goal_date_if_necessary = (user_id, time_zone) => {
  //subquery strings, with alias; should just need comma as if they're just a "field name" in terms of building a sql string.
  const days_until_goal = require("./days_until_goal")(user_id);
  const needs_new_goal = require("./needs_new_goal")(user_id);

  const result = `
    insert into user_budget_data(user_id, goal_start_date, goal_end_date)
    select 
      v.user_id,
      timezone('${time_zone}', current_date)::date as new_goal_start_date,
      (timezone('${time_zone}', current_date) + (v.days_until_goal * interval '1 day'))::date as new_goal_end_date
    from ( 
      ${days_until_goal}
    ) as v
    inner join ${needs_new_goal}
    on 
      v.user_id = needs_new_goal.user_id
    returning *;
  `;

  return result;
};

console.log(update_goal_date_if_necessary(1, "America/Anchorage"));

module.exports = update_goal_date_if_necessary;
