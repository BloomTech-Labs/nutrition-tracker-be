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
    tbl.date("start_date").defaultTo(knex.fn.now());
    tbl.decimal("weight_kg");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_metric_history");
};
