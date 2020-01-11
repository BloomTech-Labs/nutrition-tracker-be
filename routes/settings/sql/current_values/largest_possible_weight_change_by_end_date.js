module.exports = largest_possible_weight_change_by_end_date = user_id => `
( select 
    (
      2 * 0.45359237 --maximum_abs_change_rate_kg
      * (ubd.goal_end_date::date - ubd.goal_start_date::date) / 7)
    as largest_possible_weight_change_by_end_date
  from user_budget_data as ubd
  where
    ubd.user_id = ${user_id} and
    ubd.goal_start_date is not null
  order by ubd.applicable_date desc
  limit 1)
as largest_possible_weight_change_by_end_date
`;
