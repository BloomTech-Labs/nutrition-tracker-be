exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("food_log")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("food_log").insert([
        {
          // id: 1,
          user_id: 1,
          food_id: 1,
          fatsecret_food_id: 3433,
          serving_id: 10690,
          time_consumed_at: "2019-11-24T08:14:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 2.0
        },
        {
          // id: 2,
          user_id: 1,
          food_id: 2,
          fatsecret_food_id: 8765,
          serving_id: 11,
          time_consumed_at: "2019-11-24T08:14:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 1.0
        },
        {
          // id: 3,
          user_id: 1,
          food_id: 3,
          fatsecret_food_id: 7654,
          serving_id: 12,
          time_consumed_at: "2019-11-24T12:01:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 4.0
        },
        {
          // id: 4,
          user_id: 1,
          food_id: 4,
          fatsecret_food_id: 6543,
          serving_id: 13,
          time_consumed_at: "2019-11-24T13:16:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 2.0
        },
        {
          // id: 5,
          user_id: 1,
          food_id: 2,
          fatsecret_food_id: 5432,
          serving_id: 14,
          time_consumed_at: "2019-11-26T13:16:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 2.0
        },
        {
          // id: 6,
          user_id: 1,
          food_id: 1,
          fatsecret_food_id: 4321,
          serving_id: 15,
          time_consumed_at: "2019-11-24T15:30:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 1.0
        },
        {
          // id: 7,
          user_id: 1,
          food_id: 1,
          fatsecret_food_id: 3210,
          serving_id: 16,
          time_consumed_at: "2019-11-24T15:30:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 1.5
        },
        {
          // id: 8,
          user_id: 1,
          food_id: 4,
          fatsecret_food_id: 5735,
          serving_id: 21131,
          time_consumed_at: "2019-11-24T15:30:00.000Z",
          daily_nutrition_totals_date: "2019-11-24",
          time_zone_name: "America/New_York",
          time_zone_abbr: "EST",
          quantity: 2
        }
      ]);
    });
};
