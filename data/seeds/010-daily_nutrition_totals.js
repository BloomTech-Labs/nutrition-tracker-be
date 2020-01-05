exports.seed = function(knex) {
  const { presentMinusXDays } = require("../helpers/timestampOffsetFns");

  // Deletes ALL existing entries
  return knex("daily_nutrition_totals")
    .truncate()
    .then(function() {
      // Inserts seed entries

      return knex("daily_nutrition_totals").insert([
        {
          // id: 1,
          user_id: 1,
          date: presentMinusXDays(3),
          total_calories: 1000,
          fat_calories: 502,
          protein_calories: 5,
          carbs_calories: 1000 - 502 - 5
        },
        {
          // id: 2,
          user_id: 1,
          date: presentMinusXDays(2),
          total_calories: 1150,
          fat_calories: 500,
          protein_calories: 20,
          carbs_calories: 1150 - 500 - 20
        },
        {
          // id: 3,
          user_id: 1,
          date: presentMinusXDays(0),
          total_calories: 1300,
          fat_calories: 522,
          protein_calories: 15,
          carbs_calories: 1300 - 522 - 15
        },
        {
          // id: 4,
          user_id: 2,
          date: presentMinusXDays(0),
          total_calories: 1658,
          fat_calories: 176,
          protein_calories: 78,
          carbs_calories: 1658 - 176 - 78
        },
        {
          // id: 5,
          user_id: 3,
          date: presentMinusXDays(0),
          total_calories: 1842,
          fat_calories: 1842 - 321 - 45,
          protein_calories: 45,
          carbs_calories: 321
        },
        {
          // id: 6,
          user_id: 4,
          date: presentMinusXDays(0),
          total_calories: 2134,
          fat_calories: 958,
          protein_calories: 2134 - 958 - 135,
          carbs_calories: 135
        }
      ]);
    });
};
