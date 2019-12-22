module.exports = goal_weekly_weight_change_rate_kg = user_id => `
round(
  ( select abs(ubd.goal_weekly_weight_change_rate) as goal_weekly_weight_change_rate
    from user_budget_data as ubd
    where
      ubd.user_id = ${user_id} and
      ubd.goal_weekly_weight_change_rate is not null
    order by ubd.applicable_date desc
    limit 1) * 0.45359237
  , 2
)
as goal_weekly_weight_change_rate_kg
`;
