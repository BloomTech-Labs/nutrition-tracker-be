
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('consumption_log').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('consumption_log').insert([
        {
          id: 1,
          user_id:2,
          food_bev_id:1,
          time_consumed_at: knex.fn.now(6),
          human_quantity: 2,
          standard_quantity: 0.0,
          unit_type: ""
        },
        {
          id: 2,
          user_id:3,
          food_bev_id:1,
          time_consumed_at: knex.fn.now(6),
          human_quantity: 1,
          standard_quantity:  0.0,
          unit_type: ""
        },
        {
          id: 3,
          user_id:3,
          food_bev_id:2,
          time_consumed_at: knex.fn.now(6),
          human_quantity: 2,
          standard_quantity:0.0,
          unit_type: ""
        },
        {
          id: 4,
          user_id:2,
          food_bev_id:4,
          time_consumed_at: knex.fn.now(6),
          human_quantity: 1,
          standard_quantity:0.0,
          unit_type: ""
        },
        {
          id: 5,
          user_id:4,
          food_bev_id:3,
          time_consumed_at: knex.fn.now(6),
          human_quantity:1 ,
          standard_quantity:0.0 ,
          unit_type: ""
        },
        {
          id: 6,
          user_id:1,
          food_bev_id:2,
          time_consumed_at: knex.fn.now(6),
          human_quantity:3,
          standard_quantity:0.0 ,
          unit_type: ""
        },
        {
          id: 7,
          time_consumed_at: knex.fn.now(6),
          human_quantity:3,
          standard_quantity:0.0 ,
          unit_type: ""
        },
        
      ]);
    });
};

