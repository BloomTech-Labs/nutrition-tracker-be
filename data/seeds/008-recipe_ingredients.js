exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipe_ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipe_ingredients").insert([
        {
          // id: 1,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          food_id: 3, // this will point to the same record if we want to we can can add ingredients that petain to the items
          fatsecret_food_id: 9876,
          serving_id: 10,
          order: 1,
          quantity: 1.0
        },
        {
          // id: 2,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          food_id: 1,
          fatsecret_food_id: 8765,
          serving_id: 11,
          order: 2,
          quantity: 1.0
        },
        {
          // id: 3,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          food_id: 3,
          fatsecret_food_id: 7654,
          serving_id: 12,
          order: 3,
          quantity: 1.0
        },
        {
          // id: 4,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          food_id: 4,
          fatsecret_food_id: 6543,
          serving_id: 13,
          order: 1,
          quantity: 1.0
        },
        {
          // id: 5,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          food_id: 4,
          serving_id: 15,
          fatsecret_food_id: 5432,
          serving_id: 14,
          order: 2,
          quantity: 1.0
        },
        {
          // id: 6,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          fatsecret_food_id: 4321,
          serving_id: 16,
          food_id: 4,
          order: 3,
          quantity: 1.0
        }
      ]);
    });
};
