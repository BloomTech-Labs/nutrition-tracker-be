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
          applicable_date: presentMinusXDays(4),
          goal_start_date: presentMinusXDays(4),
          goal_end_date: new Date(),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 150.0,
          actual_weight_kg: 160.0,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 0.3,
          // fat_ratio: 70,
          protein_ratio: 0.2,
          // protein_ratio: 20,
          carb_ratio: 0.5
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
          fat_ratio: 0.3,
          protein_ratio: 0.2,
          carb_ratio: 0.5
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
          fat_ratio: 0.3,
          protein_ratio: 0.2,
          carb_ratio: 0.5
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
          fat_ratio: 0.3,
          protein_ratio: 0.2,
          carb_ratio: 0.5
        },
        {
          // id: 4,
          user_id: 6,
          applicable_date: presentMinusXDays(60),
          goal_start_date: presentMinusXDays(60),
          goal_end_date: presentMinusXDays(-80),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 72.58,
          actual_weight_kg: 81.64,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 0.7,
          protein_ratio: 0.2,
          carb_ratio: 0.1
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(60),
          actual_weight_kg: 86.96
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(59),
          actual_weight_kg: 86.93
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(58),
          actual_weight_kg: 86.81
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(57),
          actual_weight_kg: 86.73
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(56),
          actual_weight_kg: 86.66
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(55),
          actual_weight_kg: 86.53
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(54),
          actual_weight_kg: 86.47
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(53),
          actual_weight_kg: 86.29
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(52),
          actual_weight_kg: 86.18
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(51),
          actual_weight_kg: 86.06
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(50),
          actual_weight_kg: 85.89
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(49),
          actual_weight_kg: 85.69
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(48),
          actual_weight_kg: 85.54
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(47),
          actual_weight_kg: 85.49
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(46),
          actual_weight_kg: 85.41
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(45),
          actual_weight_kg: 85.33
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(44),
          actual_weight_kg: 85.25
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(43),
          actual_weight_kg: 85.16
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(42),
          actual_weight_kg: 85
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(41),
          actual_weight_kg: 84.94
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(40),
          actual_weight_kg: 84.83
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(39),
          actual_weight_kg: 84.76
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(38),
          actual_weight_kg: 84.65
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(37),
          actual_weight_kg: 84.61
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(36),
          actual_weight_kg: 84.58
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(35),
          actual_weight_kg: 84.39
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(34),
          actual_weight_kg: 84.23
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(33),
          actual_weight_kg: 84.07
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(32),
          actual_weight_kg: 83.93
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(31),
          actual_weight_kg: 83.84
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(30),
          actual_weight_kg: 83.81
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(29),
          actual_weight_kg: 83.69
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(28),
          actual_weight_kg: 83.55
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(27),
          actual_weight_kg: 83.5
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(26),
          actual_weight_kg: 83.35
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(25),
          actual_weight_kg: 83.29
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(24),
          actual_weight_kg: 83.19
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(23),
          actual_weight_kg: 83.14
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(22),
          actual_weight_kg: 82.94
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(21),
          actual_weight_kg: 82.81
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(20),
          actual_weight_kg: 82.71
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(19),
          actual_weight_kg: 82.6
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(18),
          actual_weight_kg: 82.52
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(17),
          actual_weight_kg: 82.35
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(16),
          actual_weight_kg: 82.22
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(15),
          actual_weight_kg: 82.03
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(14),
          actual_weight_kg: 82
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(13),
          actual_weight_kg: 81.95
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(12),
          actual_weight_kg: 81.83
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(11),
          actual_weight_kg: 81.68
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(10),
          actual_weight_kg: 81.48
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(9),
          actual_weight_kg: 81.44
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(8),
          actual_weight_kg: 81.35
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(7),
          actual_weight_kg: 81.33
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(6),
          actual_weight_kg: 81.28
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(5),
          actual_weight_kg: 81.18
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(4),
          actual_weight_kg: 81.03
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(3),
          actual_weight_kg: 80.83
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(2),
          actual_weight_kg: 80.79
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(1),
          actual_weight_kg: 80.6
        },
        {
          user_id: 6,
          applicable_date: presentMinusXDays(0),
          actual_weight_kg: 80.51
        }
      ]);
    });
};
