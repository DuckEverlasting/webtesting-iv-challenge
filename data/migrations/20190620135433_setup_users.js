
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 255).notNullable();
      tbl.string('department', 255)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
