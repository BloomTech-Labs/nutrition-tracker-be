const average_macros_over_time = (user_id, start_date) => {
  return `
    select
      ROUND(AVG(fat_calories / 9), 2) as avg_fat_consumed_g,
      ROUND(AVG(carbs_calories / 4), 2) as avg_carbs_consumed_g,
      ROUND(AVG(protein_calories / 4), 2) as avg_protein_consumed_g
    from
      daily_nutrition_totals
    where
      user_id = ${user_id} and
      date >= '${start_date}'
  `;
};

module.exports = average_macros_over_time;
