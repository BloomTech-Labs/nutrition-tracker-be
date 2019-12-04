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
    tbl.date("start_date").defaultTo(knex.fn.now());
    tbl.decimal("weekly_goal_rate");
    tbl.decimal("weight_goal_kg");
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
