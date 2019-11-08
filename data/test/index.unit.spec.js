/*
*********
* 
* Database test file
* Migrations: Make sure all expected tables are being created
*
*********
*/

const knex = require("../knex");

// This arr will hold all the tables we expect to be made on running knex migrate:latest
const tables = [
    "users",
    "food_and_beverages",
    "consumption_log",
    "recipes",
    "recipe_instructions",
    "recipe_ingredients",
    "recipes_consumption",
    "user_budget_data",
    "user_metric_history"

];

// create a function to setup our migrations
const setup = async () => {
  try {
    await knex.migrate.latest();
  } catch (err) {
    console.log(err);
  }
};

// Trunc func in case we want to to test tables in isolation
const truncate = async () => {
    // return a concat'd string of all the tables in tables array at the top of this file
    const tablesToTrunc = tables.length > 1 ? tables.join() : tables[0];

    // run the raw sql command using the concat'd tables array
    await knex.raw("truncate table " + tablesToTrunc + " cascade");
};

// Rollback our migrations so we start fresh
const teardown = async () => {
  await knex.migrate.rollback();
};

// Before all of our tests are run, do dis
beforeAll(async () => {
  await teardown();
  //jest.setTimeout(5000);
  await setup();
  
});

// If we need to, we can teardown after all tests but might not have to
// afterAll(async () => {
//   await teardown();
// });


test.each`
    table             | expected
    ${"fakeTable"}    | ${false}
    ${tables[0]}      | ${true}
    ${tables[1]}      | ${true}
    ${tables[2]}      | ${true}
    ${tables[3]}      | ${true}
    ${tables[4]}      | ${true}
    ${tables[5]}      | ${true}
    ${tables[6]}      | ${true}
    ${tables[7]}      | ${true}
    ${tables[8]}      | ${true}
`("returns $expected when we look for a table named $table", async ({table, expected}) => {
  expect(
    await knex.schema.hasTable(table).then(exists => {
      return exists;
    })
  ).toBe(expected);
});
