const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.admin, (table) => {
      table.increments("idAdmin").primary();
      table.string("gebruikersnaam", 50).notNullable();
      table.string("email", 50).notNullable();
      table.string("password_hash").notNullable();
      table.jsonb("roles").notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.admin);
  },
};
