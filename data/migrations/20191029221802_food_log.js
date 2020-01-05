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
    tbl.datetime("time_consumed_at").defaultTo(knex.fn.now());
    tbl.date("daily_nutrition_totals_date");
    tbl.text("time_zone_name").notNullable();
    tbl.text("time_zone_abbr").notNullable();
    tbl.decimal("quantity");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("food_log");
};
