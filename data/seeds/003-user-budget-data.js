exports.seed = function(knex) {
  const { presentMinusXDays } = require("../helpers/timestampOffsetFns");
  const { presentMinusXHours } = require("../helpers/timestampOffsetFns");
  // Deletes ALL existing entries
  return knex("user_budget_data")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_budget_data").insert([
        {
          // id: 1,
          user_id: 1,
          applicable_date: presentMinusXDays(0),
          goal_start_date: new Date(),
          goal_end_date: new Date(),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 150.0,
          actual_weight_kg: 160.0,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 30,
          // fat_ratio: 70,
          protein_ratio: 20,
          // protein_ratio: 20,
          carb_ratio: 50
          // carb_ratio: 10
        },
        {
          // id: 2,
          user_id: 2,
          applicable_date: new Date(),
          goal_start_date: new Date(),
          goal_end_date: new Date(),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 160.0,
          actual_weight_kg: 180.0,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 30,
          protein_ratio: 20,
          carb_ratio: 50
        },
        {
          // id: 3,
          user_id: 3,
          applicable_date: new Date(),
          goal_start_date: new Date(),
          goal_end_date: new Date(),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 160.0,
          actual_weight_kg: 180.0,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 30,
          protein_ratio: 20,
          carb_ratio: 50
        },
        {
          // id: 4,
          user_id: 4,
          applicable_date: new Date(),
          goal_start_date: new Date(),
          goal_end_date: new Date(),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 160.0,
          actual_weight_kg: 180.0,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 30,
          protein_ratio: 20,
          carb_ratio: 50
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(10),
          actual_weight_kg: 159
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(28),
          actual_weight_kg: 161
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(43),
          actual_weight_kg: 164
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(49),
          actual_weight_kg: 163
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(80),
          actual_weight_kg: 165
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(9),
          goal_weight_kg: 140
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(20),
          goal_weight_kg: 139
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(38),
          goal_weight_kg: 138
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(46),
          goal_weight_kg: 137
        },
        {
          user_id: 1,
          applicable_date: presentMinusXHours(71),
          goal_weight_kg: 135
        }
      ]);
    });
};
