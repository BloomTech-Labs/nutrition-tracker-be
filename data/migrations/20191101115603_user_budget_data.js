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
    tbl.date("start_date");
    tbl.decimal("goal_weekly_weight_change_lb");
    tbl.decimal("activity_level");
    tbl.decimal("caloric_budget");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_budget_data");
};
