const goal_rates_user_id_applicable_dates = user_id => {
  // returns query of all applicable_date's for a given user_id, where the "goal_weekly_weight_change_rate" is present. used in subquery by goal_rates_daily_applicable_dates which calculates the appropriate applicable date for each "observation date"
  return `
    ( select 
        ubd.user_id,
        ubd.applicable_date
      from user_budget_data as ubd
      where
        ubd.user_id = ${user_id} and
        ubd.goal_weekly_weight_change_rate is not null
    )
  `;
};

module.exports = goal_rates_user_id_applicable_dates;
