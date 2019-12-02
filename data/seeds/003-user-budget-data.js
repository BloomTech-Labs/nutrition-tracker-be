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
          activity_level: 1.55,
          caloric_budget: 2000.0
        },
        {
          id: 2,
          user_id: 2,
          weekly_goal_rate: 1.0,
          activity_level: 1.725,
          caloric_budget: 2500.0
        },
        {
          id: 3,
          user_id: 3,
          weekly_goal_rate: 1.0,
          activity_level: 1.375,
          caloric_budget: 1965.0
        },
        {
          id: 4,
          user_id: 4,
          weekly_goal_rate: 1.0,
          activity_level: 1.2,
          caloric_budget: 1805.0
        }
      ]);
    });
};
