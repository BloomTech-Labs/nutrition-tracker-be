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

// This arr will hold all the tables & columns we expect to be made when we run knex migrate:latest
const tables = [
  ["users", ["id", "firebase_id", "email", "height_cm", "sex", "dob"]],
  [
    "foods",
    [
      "id",
      "fatsecret_food_id",
      "serving_id",
      "retrieved_at",
      "food_name",
      "food_type",
      "brand_name",
      "serving_url",
      "serving_desc",
      "serving_qty",
      "serving_unit",
      "metric_serving_amt",
      "metric_serving_unit",
      "calories_kcal",
      "fat_g",
      "carbs_g",
      "protein_g",
      "saturated_fat_g",
      "monounsaturated_fat_g",
      "polyunsaturated_fat_g",
      "trans_fat_g",
      "fiber_g",
      "sugar_g",
      "sodium_mg",
      "potassium_mg",
      "cholesterol_mg",
      "vitamin_a_daily_pct",
      "vitamin_c_daily_pct",
      "calcium_daily_pct",
      "iron_daily_pct"
    ]
  ],
  [
    "food_log",
    [
      "id",
      "user_id",
      "food_id",
      "fatsecret_food_id",
      "serving_id",
      "time_consumed_at",
      "time_zone_name",
      "time_zone_abbr",
      "quantity"
    ]
  ],
  [
    "recipes",
    [
      "id",
      "fatsecret_recipe_id",
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
    [
      "id",
      "recipe_id",
      "fatsecret_recipe_id",
      "step_number",
      "step_description"
    ]
  ],
  [
    "recipe_ingredients",
    [
      "id",
      "recipe_id",
      "fatsecret_recipe_id",
      "food_id",
      "fatsecret_food_id",
      "serving_id",
      "order",
      "quantity"
    ]
  ],
  [
    "recipes_log",
    [
      "id",
      "user_id",
      "recipe_id",
      "fatsecret_recipe_id",
      "time_consumed_at",
      "recipe_proportion"
    ]
  ],
  [
    "user_budget_data",
    [
      "id",
      "user_id",
      "applicable_date",
      "goal_start_date",
      "goal_end_date",
      "goal_weekly_weight_change_rate",
      "goal_weight_kg",
      "actual_weight_kg",
      "activity_level",
      "caloric_budget",
      "fat_ratio",
      "carb_ratio",
      "protein_ratio"
    ]
  ],
  [
    "daily_nutrition_totals",
    [
      "id",
      "user_id",
      "date",
      "total_calories",
      "fat_calories",
      "carbs_calories",
      "protein_calories"
    ]
  ]
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

// helper function to count columns of a table
const columnCount = async table => {
  const columnObject = await knex(table)
    .columnInfo()
    .then(columns => columns);
  return Object.keys(columnObject).length;
};

// If we need to, we can teardown after all tests but might not have to
// afterAll(async () => {
//   await teardown();
// });

// Jest's 'each' globals can accept a table of data! SICK!
describe.each`
  tableArray   | expected
  ${tables[0]} | ${true}
  ${tables[1]} | ${true}
  ${tables[2]} | ${true}
  ${tables[3]} | ${true}
  ${tables[4]} | ${true}
  ${tables[5]} | ${true}
  ${tables[6]} | ${true}
  ${tables[7]} | ${true}
  ${tables[8]} | ${true}
`(`Let's check out the table named $tableArray`, ({ tableArray, expected }) => {
  // We want to know if the current pg table we're looking at exists
  // We'll need this var in other functions, so init it in a higher scope : )
  let tableExists = [];

  // For the sake of being verbose, these vars should clarify what we're looking for
  let table = tableArray[0];
  let tableColumns = tableArray[1];

  // knex returns promises, so a lot of these tests would break without async/await
  test(`Returns ${expected} when we look for a table named ${table}`, async () => {
    expect(
      await knex.schema.hasTable(table).then(exists => {
        tableExists = exists;
        return exists;
      })
    ).toBe(expected);
  });

  test(`Does the table ${table} have ${tableColumns.length} columns?`, async () => {
    expect(
      await columnCount(table).then(count => {
        return count;
      })
    ).toBe(tableColumns.length);
  });

  test.each(tableColumns)(
    `Does the column '%s' in ${table} exist?`,
    async column => {
      expect(
        await knex.schema.hasColumn(table, column).then(hasColumn => {
          return hasColumn;
        })
      ).toBe(expected);
    }
  );
});
