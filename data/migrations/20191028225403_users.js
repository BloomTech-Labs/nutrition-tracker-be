 
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .text("firebase_id")
      .unique()
      .notNullable();
    tbl.text("email");
    tbl.decimal("height_cm").notNullable();
    tbl.enu("sex", ["Male", "Female"], {
      useNative: true,
      enumName: "sex_type"
    });
    tbl.date("dob").notNullable();
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").raw("DROP TYPE sex_type;");
};