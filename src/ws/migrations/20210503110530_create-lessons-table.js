//Updade
// npx knex migrate:latest
exports.up = function (knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments();
        table.text('name', 128).unique().notNullable();
        table.text('MD5', 255).notNullable();
        table.integer('status');
        table.timestamps(true, true);
      })
      .createTable('admin', (table) => {
        table.increments();
        table.text('name', 128).unique().notNullable();
        table.text('MD5', 255).notNullable();
        table.integer('status');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function (knex) {
    return knex.schrema.dropTableIfExists('users');
  };