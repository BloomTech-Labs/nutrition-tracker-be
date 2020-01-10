module.exports = actual_weight_kg = user_id => `
( select ubd.actual_weight_kg
  from user_budget_data as ubd
  where
    ubd.user_id = ${user_id} and
    ubd.actual_weight_kg is not null
  order by ubd.applicable_date desc
  limit 1)
as actual_weight_kg
`;
