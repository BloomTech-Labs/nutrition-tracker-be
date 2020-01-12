const actual_fat_macros_over_time = (user_id, start_date, end_date) => {
  //calculates the sql query for: the actual calories consumed on a given observation_date within the date range from "goal start date" to "goal end date"
  // ran by fn in "../caloriesOverTimeDB"
  const observation_dates = require("./observation_dates")(
    start_date,
    end_date
  );
  return `
    select 
      ${user_id} as user_id,
      od.observation_date,
      COALESCE(ROUND(d_n_t.fat_calories / d_n_t.total_calories * 100), 0) as actual_fat_macros
    from ${observation_dates} as od
    left join (select date, fat_calories, total_calories from daily_nutrition_totals where user_id = ${user_id}) as d_n_t
    on 
      od.observation_date = d_n_t.date
  `;
};

module.exports = actual_fat_macros_over_time;
