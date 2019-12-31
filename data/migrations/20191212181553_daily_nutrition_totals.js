const tableName = "daily_nutrition_totals";
const constraintName = "user_id_date_unique";

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.date("date").defaultTo(knex.fn.now());
    tbl.decimal("total_calories");
    tbl.decimal("fat_calories");
    tbl.decimal("carbs_calories");
    tbl.decimal("protein_calories");

    tbl.unique(["user_id", "date"], constraintName);
    //these values make it explicit that we can't have multiple records
    //of a given user_id && date combination
    //very beneficial for UPSERTing, although it's not explicitly required
    //to do so
  });
};

exports.down = function(knex) {
  return knex.schema
    .raw(
      `
        ALTER TABLE ${tableName}
        DROP CONSTRAINT IF EXISTS ${constraintName};
      `
    )
    .dropTableIfExists(tableName);
};
