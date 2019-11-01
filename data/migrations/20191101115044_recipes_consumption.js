exports.up = function(knex) {
  return knex.schema.createTable("recipes_consumption", tbl => {
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
      .datetime("time_consumed_at", { precision: 6 })
      .defaultTo(knex.fn.now(6));
    tbl.decimal("recipe_proportion");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes_consumption");
};
