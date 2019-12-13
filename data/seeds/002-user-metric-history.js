exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_metric_history")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_metric_history").insert([
        {
          // id: 1,
          user_id: 1,
          weight_kg: 81.6466
        },
        {
          // id: 2,
          user_id: 3,
          weight_kg: 72.5748
        },
        {
          // id: 3,
          user_id: 2,
          weight_kg: 86.1826
        },
        {
          // id: 4,
          user_id: 4,
          weight_kg: 70.3068
        },
        {
          // id: 5,
          user_id: 2,
          weight_kg: 85.729
        },
        {
          // id: 6,
          user_id: 3,
          weight_kg: 72.1212
        },
        {
          // id: 7,
          user_id: 1,
          weight_kg: 81.193
        }
      ]);
    });
};
