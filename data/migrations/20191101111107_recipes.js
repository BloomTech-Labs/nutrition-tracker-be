exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();
    tbl
      .integer("fatsecret_recipe_id")
      .unsigned()
      .notNullable();
    tbl.text("name");
    tbl.text("description");
    tbl.decimal("prep_time_min");
    tbl.decimal("cook_time_min");
    tbl.decimal("servings");
    tbl.decimal("standard_quantity");
    tbl.text("serving_description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};
