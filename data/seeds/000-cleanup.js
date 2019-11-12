
exports.seed = async function(knex) {

  try{

    await knex.truncate('user_metric_history');
    await knex.truncate('user_budget_data');
    await knex.truncate('recipes_consumption');
    await knex.truncate('recipe_ingredients');
    await knex.truncate('recipe_instructions');
    await knex.raw('TRUNCATE TABLE recipes RESTART IDENTITY CASCADE');
    await knex.truncate('consumption_log');
    await knex.raw('TRUNCATE TABLE food_and_beverages RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    
    //continue cleanup on tables
  
  } catch(err) {
     console.log(err);
  }
};
