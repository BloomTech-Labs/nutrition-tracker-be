exports.up = function(knex) {
  return knex.schema.createTable("recipes_log", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
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
    tbl.datetime("time_consumed_at").defaultTo(knex.fn.now());
    tbl.float("recipe_proportion");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes_log");
};
