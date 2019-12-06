exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("food_log");
  // .truncate()
  // .then(function() {
  //   // Inserts seed entries
  //   return knex("food_log").insert([
  //     {
  //       id: 1,
  //       user_id: 2,
  //       food_id: 1,
  //       fatsecret_food_id: 9876,
  //       serving_id: 10,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 2.0
  //     },
  //     {
  //       id: 2,
  //       user_id: 3,
  //       food_id: 2,
  //       fatsecret_food_id: 8765,
  //       serving_id: 11,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 1.0
  //     },
  //     {
  //       id: 3,
  //       user_id: 3,
  //       food_id: 3,
  //       fatsecret_food_id: 7654,
  //       serving_id: 12,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 4.0
  //     },
  //     {
  //       id: 4,
  //       user_id: 2,
  //       food_id: 4,
  //       fatsecret_food_id: 6543,
  //       serving_id: 13,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 2.0
  //     },
  //     {
  //       id: 5,
  //       user_id: 4,
  //       food_id: 2,
  //       fatsecret_food_id: 5432,
  //       serving_id: 14,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 2.0
  //     },
  //     {
  //       id: 6,
  //       user_id: 1,
  //       food_id: 1,
  //       fatsecret_food_id: 4321,
  //       serving_id: 15,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 1.0
  //     },
  //     {
  //       id: 7,
  //       user_id: 1,
  //       food_id: 1,
  //       fatsecret_food_id: 3210,
  //       serving_id: 16,
  //       time_consumed_at: knex.fn.now(6),
  //       quantity: 1.5
  //     }
  //   ]);
  // });
};

//In the foods table we need to reflect the FK for food_id to be foods_id and update the DB Designer
//Need to update this table name in the cleanup.js file
