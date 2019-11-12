exports.up = function(knex) {
  return knex.schema.createTable("recipe_ingredients", tbl => {
    tbl.increments();
    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("food_bev_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("food_and_beverages")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.integer("order").unsigned();
    tbl.decimal("human_quantity");
    tbl.decimal("standard_quantity");
    tbl.text("unit_type");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipe_ingredients");
};
