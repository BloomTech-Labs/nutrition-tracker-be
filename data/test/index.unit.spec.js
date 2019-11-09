/*
 *********
 *
 * Database test file
 * ✓ Migrations: Make sure all expected tables are being created
 * ✓ Migrations: Make sure each table has the expected columns
 *
 *********
 */

const knex = require("../knex");

// This arr will hold all the tables we expect to be made on running knex migrate:latest
const tables = [
  ["users", ["username", "password", "email", "height_cm", "sex", "dob"]],
  [
    "food_and_beverages",
    [
      "name",
      "human_unit",
      "human_quantity",
      "standard_unit",
      "standard_quantity",
      "calories",
      "fat_g",
      "protein_g",
      "carbs_g",
      "sugar_g",
      "fiber_g",
      "sodium_mg"
    ]
  ],
  [
    "consumption_log",
    [
      "user_id",
      "food_bev_id",
      "id",
      "time_consumed_at",
      "human_quantity",
      "standard_quantity",
      "unit_type"
    ]
  ],
  [
    "recipes",
    [
      "name",
      "description",
      "prep_time_min",
      "cook_time_min",
      "servings",
      "standard_quantity",
      "serving_description"
    ]
  ],
  [
    "recipe_instructions",
    ["recipe_id", "id", "step_number", "step_description"]
  ],
  [
    "recipe_ingredients",
    [
      "recipe_id",
      "id",
      "food_bev_id",
      "id",
      "order",
      "human_quantity",
      "standard_quantity",
      "unit_type"
    ]
  ],
  [
    "recipes_consumption",
    [
      "user_id",
      "id",
      "recipe_id",
      "id",
      "time_consumed_at",
      "recipe_proportion"
    ]
  ],
  [
    "user_budget_data",
    [
      "user_id",
      "id",
      "start_date",
      "goal_weekly_weight_change_lb",
      "activity_level",
      "caloric_budget"
    ]
  ],
  ["user_metric_history", ["user_id", "id", "observation_time", "weight_kg"]]
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
  const concatTables = [];
  for (const table in tables) {
    concatTables.push(table[0]);
  }
  const tablesToTrunc = tables.length > 1 ? concatTables.join() : tables[0][0];

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

describe.each`
  table        | expected
  ${tables[0]} | ${true}
  ${tables[1]} | ${true}
  ${tables[2]} | ${true}
  ${tables[3]} | ${true}
  ${tables[4]} | ${true}
  ${tables[5]} | ${true}
  ${tables[6]} | ${true}
  ${tables[7]} | ${true}
  ${tables[8]} | ${true}
`(`let's check out the table named $table`, ({ table, expected }) => {
  let tableExists = [];
  test(`returns ${expected} when we look for a table named ${
    table[0]
  }`, async () => {
    expect(
      await knex.schema.hasTable(table[0]).then(exists => {
        tableExists = exists;
        return exists;
      })
    ).toBe(expected);
  });

  test.each(table[1])(`Does the column %s exist?`, async column => {
    expect(
      await knex.schema.hasColumn(table[0], column).then(hasColumn => {
        return hasColumn;
      })
    ).toBe(expected);
  });
});
