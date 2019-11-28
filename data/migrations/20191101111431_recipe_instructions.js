exports.up = function(knex) {
  return knex.schema.createTable("recipe_instructions", tbl => {
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
    tbl.integer("step_number");
    tbl.text("step_description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipe_instructions");
};
