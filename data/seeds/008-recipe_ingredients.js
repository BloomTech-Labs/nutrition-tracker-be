
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        {
          id: 1,
          recipe_id:1,
          food_bev_id:3,  // this will point to the same record if we want to we can can add ingredients that petain to the items
          order:1,
          human_quantity:1.0,
          standard_quantity:0.0,
          unit_type: ""
         }, 
           {
          id: 2,
          recipe_id:1,
          food_bev_id:1,  
          order:2,
          human_quantity:1.0,
          standard_quantity:0.0,
          unit_type: ""
         },
         {
          id: 3,
          recipe_id:1,
          food_bev_id:3,  
          order:3,
          human_quantity:8.0,
          standard_quantity:8.0,
          unit_type: ""
         },
         {
          id: 4,
          recipe_id:2,
          food_bev_id:4,  
          order:1,
          human_quantity:8.0,
          standard_quantity:8.0,
          unit_type: ""
         },
         {
          id: 5,
          recipe_id:2,
          food_bev_id:4,  
          order:2,
          human_quantity:1.0,
          standard_quantity:1.0,
          unit_type: ""
         },
         {
          id: 6,
          recipe_id:2,
          food_bev_id:4,  
          order:3,
          human_quantity:1.0,
          standard_quantity:1.0,
          unit_type: ""
         },
     
      ]);
    });
};


