exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE recipes_log RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("recipes_log").insert([
        // {
        //   // id: 1,
        //   user_id: 1,
        //   recipe_id: 2,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 2.0
        // },
        // {
        //   // id: 2,
        //   user_id: 2,
        //   recipe_id: 2,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 1.0
        // },
        // {
        //   // id: 3,
        //   user_id: 1,
        //   recipe_id: 1,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 1.5
        // },
        // {
        //   // id: 4,
        //   user_id: 3,
        //   recipe_id: 2,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 1.0
        // },
        // {
        //   // id: 5,
        //   user_id: 1,
        //   recipe_id: 1,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 2.0
        // },
        // {
        //   // id: 6,
        //   user_id: 1,
        //   recipe_id: 2,
        //   fatsecret_recipe_id: 0,
        //   time_consumed_at: knex.fn.now(6),
        //   recipe_proportion: 1.0
        // }
      ]);
    });
};
