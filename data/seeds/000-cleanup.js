
exports.seed = async function(knex) {

  try{
    
    await knex.truncate('user_metric_history');
    await knex.truncate('user_budget_data');
    await knex.truncate('consumption_log');
    await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    
    //continue cleanup on tables
  
  } catch(err) {
     console.log(err);
  }
};
