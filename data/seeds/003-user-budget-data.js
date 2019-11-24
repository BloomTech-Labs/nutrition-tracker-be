exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_budget_data")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_budget_data").insert([
        {
          id: 1,
          user_id: 1,
          weekly_goal_rate: 1.0,
          start_date: knex.fn.now(6),
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio:30,
          protein_ratio:20,
          carb_ratio: 50
        },
        {
          id: 2,
          user_id: 2,
          weekly_goal_rate: 1.0,
          start_date: knex.fn.now(6),
          activity_level: 1.725,
          caloric_budget: 2500.0,
          fat_ratio:20,
          protein_ratio:30,
          carb_ratio: 50
        },
        {
          id: 3,
          user_id: 3,
          weekly_goal_rate: 1.0,
          start_date: knex.fn.now(6),
          activity_level: 1.375,
          caloric_budget: 1965.0,
          fat_ratio:25,
          protein_ratio:30,
          carb_ratio: 45
        },
        {
          id: 4,
          user_id: 4,
          weekly_goal_rate: 1.0,
          start_date: knex.fn.now(6),
          activity_level: 1.2,
          caloric_budget: 1805.0,
          fat_ratio:35,
          protein_ratio:35,
          carb_ratio: 30
        }
      ]);
    });
};
