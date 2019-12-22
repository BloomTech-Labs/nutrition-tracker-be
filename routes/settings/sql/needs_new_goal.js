const needs_new_goal = user_id => {
  // if this query returns 0 records, then it
  // means that the user will not receive a new
  // goal_start_date & goal_end_date

  return `
// WE:
// USEFUL SQL
//select (select 2.0 as maximum_abs_change_rate_kg), 'three' as asdf

// DEV NOTE -- IF THIS DEV NOTE EXISTS, _DO NOT USE THIS FUNCTION_.
// IT DOESNT WORK; IT ALWAYS RETURNS RECORDS
// END DEV NOTE
    (
      select u.id as user_id
      from users as u 
      where u.id = ${user_id} 
      order by id 
      limit 1
    ) as needs_new_goal
  `;
};
module.exports = needs_new_goal;
