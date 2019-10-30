
exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .text("username")
        .unique()
        .notNullable();
      tbl.text("password").notNullable();
      tbl.text("email");
      tbl.decimal("height_cm");
      tbl.enu('sex', ['male', 'female'], { useNative: true, enumName: 'sex_type' });
      tbl.date('dob');
    });
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users");
};

