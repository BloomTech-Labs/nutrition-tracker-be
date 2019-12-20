exports.seed = async function(knex) {
  try {
    await knex.truncate("user_budget_data");
    await knex.truncate("recipes_log");
    await knex.truncate("recipe_ingredients");
    await knex.truncate("recipe_instructions");
    await knex.raw("TRUNCATE TABLE recipes RESTART IDENTITY CASCADE");
    await knex.truncate("food_log");
    await knex.raw("TRUNCATE TABLE foods RESTART IDENTITY CASCADE");
    await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

    //continue cleanup on tables
  } catch (err) {
    console.log(err);
  }
};
