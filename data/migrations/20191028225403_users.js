exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .text("username")
      .unique()
      .notNullable();
    tbl.text("password");
    tbl.text("email").notNullable();
    tbl.decimal("height_cm").notNullable();
    tbl
      .enu("sex", ["male", "female"], { useNative: true, enumName: "sex_type" })
      .notNullable();
    tbl.date("dob").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").raw("DROP TYPE sex_type;");
};
