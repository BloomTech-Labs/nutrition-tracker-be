const needs_new_goal = user_id => {
  const largest_possible_weight_change_by_end_date = require("./current_values/largest_possible_weight_change_by_end_date")(
    user_id
  );
  const actual_weight_kg = require("./current_values/actual_weight_kg")(user_id);
  const goal_weight_kg = require("./current_values/goal_weight_kg")(user_id);
  // if this query returns 0 records, then it
  // means that the user will not receive a new
  // goal_start_date & goal_end_date
  return `
    ( select 
        TRUE as needs_new_goal 
        --this value isn't actually used; it's there only because
        --we need to return something, and it makes the most sense
        --to return the boolean value that is being calculated in
        --the where clause, and needs_new_goal is the most accurate desc.
      from (
        select  
          ${largest_possible_weight_change_by_end_date},
          ${goal_weight_kg},
          ${actual_weight_kg}
      ) as v
      where
        -- if "change required" is greater than "max possible change", 
        -- then the goal is unachievable, and we need a new goal
        abs(v.goal_weight_kg - v.actual_weight_kg) > 
        v.largest_possible_weight_change_by_end_date
    ) as needs_new_goal
  `;
};
module.exports = needs_new_goal;
