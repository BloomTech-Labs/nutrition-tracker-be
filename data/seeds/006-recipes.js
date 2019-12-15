exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE recipes RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          // id: 1,
          fatsecret_recipe_id: 9876,
          name: "Stuffed Chicken Breast",
          description:
            "Scrumptious chicken breast stuffed with light feta cheese, spiced red peppers and black olives with a light crispy coating",
          prep_time_min: 10.0,
          cook_time_min: 45.0,
          servings: 2.0,
          standard_quantity: 0.0,
          serving_description: "place on plate"
        },

        {
          // id: 2,
          fatsecret_recipe_id: 8765,
          name: "Baked Salmon",
          description: "A healthy, easy salmon dish",
          prep_time_min: 5.0,
          cook_time_min: 15.0,
          servings: 1.0,
          standard_quantity: 0.0,
          serving_description: "place on plate"
        }
      ]);
    });
};
