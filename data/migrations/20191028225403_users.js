exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .text('firebase_id')
      .unique()
      .notNullable();
    tbl.text('email');
    tbl.decimal('height_cm');
    tbl.enu('sex', ['male', 'female'], {
      useNative: true,
      enumName: 'sex_type'
    });
    tbl.date('dob');
    tbl.enu('unit_system', ['Imperial', 'Metric'], {
      useNative: true,
      enumName: 'unit_system_type'
    });
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .raw('DROP TYPE sex_type;')
    .raw('DROP TYPE unit_system_type;');
};
