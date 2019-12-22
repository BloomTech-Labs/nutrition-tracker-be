module.exports = calculated_days_until_goal = user_id => {
  //subquery strings, with alias; should just need comma as if they're just a "field name" in terms of building a sql string.
  const actual_weight_kg = require("./current_values/actual_weight_kg")(user_id);
  const goal_weekly_weight_change_rate_kg = require("./current_values/goal_weekly_weight_change_rate_kg")(user_id);
  const goal_weight_kg = require("./current_values/goal_weight_kg")(user_id);

  const result = `
    select 
      v.user_id,
      ceil(abs(v.actual_weight_kg - v.goal_weight_kg) / v.goal_weekly_weight_change_rate_kg * 7) as calculated_days_until_goal
    from ( 
      select 
        ${user_id} as user_id,
        ${actual_weight_kg}, 
        ${goal_weight_kg}, 
        ${goal_weekly_weight_change_rate_kg}
    ) as v
  `;

  return result;
};
