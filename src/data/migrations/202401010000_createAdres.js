const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.adres, (table) => {
      table.increments("idAdres").primary();
      table.string("straat", 255).notNullable();
      table.string("nummer", 255).notNullable();
      table.string("stad", 255).notNullable();
      table.string("postcode", 255).notNullable();
      table.timestamp("laatstGebruikt").notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.adres);
  },
};
