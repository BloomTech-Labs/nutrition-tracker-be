exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE foods RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("foods").insert([
        {
          id: 1,
          name: "white bread",
          human_unit: "slice",
          human_quantity: 1,
          standard_unit: "g",
          standard_quantity: 0.0,
          calories: 66,
          fat_g: 0.82,
          protein_g: 1.91,
          carbs_g: 12.65,
          sugar_g: 1.08,
          fiber_g: 0.6,
          sodium_mg: 170
        },
        {
          id: 2,
          name: "cheese pizza",
          human_unit: "piece",
          human_quantity: 1,
          standard_unit: "g",
          standard_quantity: 0.0,
          calories: 237,
          fat_g: 10.1,
          protein_g: 10.6,
          carbs_g: 26.08,
          sugar_g: 3.06,
          fiber_g: 1.6,
          sodium_mg: 462
        },
        {
          id: 3,
          name: "chicken breast",
          human_unit: "small",
          human_quantity: 1,
          standard_unit: "g",
          standard_quantity: 0.0,
          calories: 164,
          fat_g: 6.48,
          protein_g: 24.82,
          carbs_g: 0,
          sugar_g: 0,
          fiber_g: 0,
          sodium_mg: 330
        },
        {
          id: 4,
          name: "salmon",
          human_unit: "1 oz boneless",
          human_quantity: 1,
          standard_unit: "g",
          standard_quantity: 0.0,
          calories: 41,
          fat_g: 1.68,
          protein_g: 6.13,
          carbs_g: 0,
          sugar_g: 0,
          fiber_g: 0,
          sodium_mg: 13
        }
      ]);
    });
};
