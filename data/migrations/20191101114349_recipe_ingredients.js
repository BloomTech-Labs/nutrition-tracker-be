exports.up = function(knex) {
  return knex.schema.createTable("recipe_ingredients", tbl => {
    tbl.increments();
    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("fatsecret_recipe_id")
      .unsigned()
      .notNullable();
    tbl
      .integer("food_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("foods")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("fatsecret_food_id")
      .unsigned()
      .notNullable();
    tbl
      .integer("serving_id")
      .unsigned()
      .notNullable();
    tbl.integer("order").unsigned();
    tbl.decimal("quantity");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipe_ingredients");
};
