exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_budget_data")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_budget_data").insert([
        {
          // id: 1,
          user_id: 1,
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
        }
      ]);
    });
};
