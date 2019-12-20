exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipe_instructions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipe_instructions").insert([
        {
          // id: 1,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 1,
          step_description:
            "In a large non-stick skillet, heat olive oil; sauté onion until golden, 5 minutes."
        },
        {
          // id: 2,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 2,
          step_description:
            "Wilt spinach (steam or heat damp in pan); stir in lemon zest, feta, salt and pepper. Set aside."
        },
        {
          // id: 3,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 3,
          step_description:
            "Divide spinach mixture between chicken breast cutlets."
        },
        {
          // id: 4,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 4,
          step_description: "Roll up and secure with toothpicks."
        },
        {
          // id: 5,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 5,
          step_description:
            "In same skillet, heat remaining oil over medium-high heat."
        },
        {
          // id: 6,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 6,
          step_description:
            "Cook chicken, turning occasionally until golden brown and cooked through, about 10 minutes."
        },
        {
          // id: 7,
          recipe_id: 1,
          fatsecret_recipe_id: 0,
          step_number: 7,
          step_description: "Remove toothpicks"
        },
        {
          // id: 8,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          step_number: 1,
          step_description: "Pre-heat oven to 350 °F (175 °C)."
        },
        {
          // id: 9,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          step_number: 2,
          step_description:
            "Rinse off salmon filet. Place a sheet of aluminum foil on cookie sheet. Place fillet on aluminum foil. Cover with lemon juice. Sprinkle garlic powder on top of fillet."
        },
        {
          // id: 10,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          step_number: 3,
          step_description:
            "Close foil over fillet. Place cookie sheet in oven. Bake 10 to 20 minutes (depending on thickness) until fillet flakes easily."
        },
        {
          // id: 11,
          recipe_id: 2,
          fatsecret_recipe_id: 0,
          step_number: 4,
          step_description:
            "Enjoy with steamed vegetables and rice or other healthy vegetable side dish."
        }
      ]);
    });
};
