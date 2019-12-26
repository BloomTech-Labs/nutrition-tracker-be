const actual_weights_user_id_applicable_dates = user_id => `
( select 
    ubd.user_id,
    ubd.applicable_date
  from user_budget_data as ubd
  where
    ubd.user_id = ${user_id} and
    ubd.actual_weight_kg is not null)
as a
`;

module.exports = actual_weights_user_id_applicable_dates;
