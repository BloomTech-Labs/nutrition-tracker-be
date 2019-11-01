exports.up = function(knex) {
  return knex.schema.createTable("consumption_log", tbl => {
    tbl.increments();
        tbl.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
        tbl.integer("food_bev_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("food_and_beverages")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
        tbl.datetime("time_consumed_at", { precision: 6 })
      .defaultTo(knex.fn.now(6));
    tbl.decimal("human_quantity");
    tbl.decimal("standard_quantity");
    tbl.text("unit_type");
  });
};

exports.down = function(knex) {
  return knex.shema
    .dropTableIfExists("consumption_log");
};
