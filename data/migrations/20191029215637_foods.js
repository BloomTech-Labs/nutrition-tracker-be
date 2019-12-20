exports.up = function(knex) {
  //all fatsecret data-fields (excluding things like id's) must be nullable because we have to
  //refresh the data to satisfy FatSecret's API's ToS
  return knex.schema.createTable("foods", tbl => {
    tbl.increments();
    tbl
      .integer("fatsecret_food_id")
      .unsigned()
      .notNullable();
    tbl
      .integer("serving_id")
      .unsigned()
      .notNullable();
    tbl
      .datetime("retrieved_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    tbl.text("food_name");
    tbl.enu("food_type", ["Brand", "Generic"], {
      useNative: true,
      enumName: "food_type"
    }); // see: https://platform.fatsecret.com/api/Default.aspx?screen=rapitypes#food
    tbl.text("brand_name");
    tbl.text("serving_url");
    tbl.text("serving_desc"); // eg "1/2 cup"
    tbl.decimal("serving_qty"); // eg "1/2"
    tbl.text("serving_unit"); // eg "cup"
    tbl.decimal("metric_serving_amt");
    tbl.text("metric_serving_unit");
    tbl.decimal("calories_kcal");
    tbl.decimal("fat_g");
    tbl.decimal("carbs_g");
    tbl.decimal("protein_g");
    tbl.decimal("saturated_fat_g");
    tbl.decimal("monounsaturated_fat_g");
    tbl.decimal("polyunsaturated_fat_g");
    tbl.decimal("trans_fat_g");
    tbl.decimal("fiber_g");
    tbl.decimal("sugar_g");
    tbl.decimal("cholesterol_mg");
    tbl.decimal("sodium_mg");
    tbl.decimal("potassium_mg");
    tbl.decimal("vitamin_a_daily_pct");
    tbl.decimal("vitamin_c_daily_pct");
    tbl.decimal("calcium_daily_pct");
    tbl.decimal("iron_daily_pct");

    tbl.unique(
      ["fatsecret_food_id", "serving_id"],
      "fatsecret_food_id_serving_id_unique"
    );
  });
};

exports.down = function(knex) {
  return knex.schema
    .raw(
      `
      ALTER TABLE foods
      DROP CONSTRAINT IF EXISTS fatsecret_food_id_serving_id_unique;
      `
    )
    .dropTableIfExists("foods")
    .raw("DROP TYPE food_type;");
};
