exports.up = function(knex) {
  return knex.schema.createTable("food_log", tbl => {
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
    tbl
      .datetime("time_consumed_at").defaultTo(knex.fn.now(6));
    tbl.integer("utc_offset_seconds").notNullable();
    tbl.decimal("quantity");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("food_log");
};