
exports.up = function(knex) {
  return knex.schema
    .createTable("food_and_beverages", tbl => {
        tbl.increments();
        tbl.text("name")
        .unique()
        .notNullable();
        tbl.text("human_unit");
        tbl.decimal("human_quantity");
        tbl.text("standard_unit");
        tbl.decimal("standard_quantity");
        tbl.decimal("calories");
        tbl.decimal("fat_g");
        tbl.decimal("protein_g");
        tbl.decimal("carbs_g");
        tbl.decimal("sugar_g");
        tbl.decimal("fiber_g");
        tbl.decimal("sodium_mg");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("food_and_beverages");
};
