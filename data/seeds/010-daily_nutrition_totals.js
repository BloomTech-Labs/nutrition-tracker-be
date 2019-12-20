exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("daily_nutrition_totals")
    .truncate()
    .then(function() {
      // Inserts seed entries
      const currDateTime = new Date();
      // takes current date and subtracts off x number of days
      const presentMinusXDays = x =>
        new Date(currDateTime - 1000 * 60 * 60 * 24 * x);

      return knex("daily_nutrition_totals").insert([
        {
          // id: 1,
          user_id: 1,
          date: presentMinusXDays(0),
          total_calories: 1000,
          fat_calories: 502,
          protein_calories: 5,
          carbs_calories: 1000 - 502 - 5
        },
        {
          // id: 2,
          user_id: 1,
          date: presentMinusXDays(1),
          total_calories: 1150,
          fat_calories: 500,
          protein_calories: 20,
          carbs_calories: 1150 - 500 - 20
        },
        {
          // id: 3,
          user_id: 1,
          date: presentMinusXDays(2),
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
        },
        {
          // id: 7,
          user_id: 5,
          date: presentMinusXDays(0),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          // id: 8,
          user_id: 5,
          date: presentMinusXDays(1),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          // id: 9,
          user_id: 5,
          date: presentMinusXDays(2),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          // id: 10,
          user_id: 5,
          date: presentMinusXDays(3),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          // id: 11,
          user_id: 5,
          date: presentMinusXDays(4),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          // id: 12,
          user_id: 5,
          date: presentMinusXDays(5),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          // id: 13,
          user_id: 5,
          date: presentMinusXDays(6),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        }
      ]);
    });
};
