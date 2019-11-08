exports.up = function(knex) {
  return knex.schema.createTable("user_metric_history", tbl => {
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
      .datetime("observation_time", { precision: 6 })
      .defaultTo(knex.fn.now(6));
    tbl.decimal("weight_kg");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_metric_history");
};