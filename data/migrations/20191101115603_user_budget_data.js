exports.up = function(knex) {
  return knex.schema.createTable("user_budget_data", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.datetime("applicable_date").defaultTo(knex.fn.now());
    tbl.datetime("goal_start_date");
    tbl.datetime("goal_end_date");
    tbl.decimal("goal_weekly_weight_change_rate");
    tbl.decimal("goal_weight_kg");
    tbl.decimal("actual_weight_kg");
    tbl.decimal("activity_level");
    tbl.decimal("caloric_budget");
    tbl.float("fat_ratio");
    tbl.float("protein_ratio");
    tbl.float("carb_ratio");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_budget_data");
};
