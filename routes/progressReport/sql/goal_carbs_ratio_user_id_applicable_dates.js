const goal_carbs_ratio_daily_applicable_dates = user_id => {
  // returns query of all applicable_date's for a given user_id, where the "caloric_budget" is present. used in subquery by goal_calories_daily_applicable_dates which calculates the appropriate applicable date for each "observation date"
  return `
    ( select 
        ubd.user_id,
        ubd.applicable_date
      from user_budget_data as ubd
      where
        ubd.user_id = ${user_id} and
        ubd.carb_ratio is not null
    )

  `;
};

module.exports = goal_carbs_ratio_daily_applicable_dates;
