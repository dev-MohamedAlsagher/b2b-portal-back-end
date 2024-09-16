const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments("idProduct").primary();
      table.string("naam", 255).notNullable();
      table.double("eenheidsprijs").notNullable();
      table.integer("btwtarief").notNullable();
      table.string("foto").notNullable();
      table.integer("aantal").notNullable().defaultTo(0);
      table.decimal("gewicht", 10, 2).notNullable().defaultTo(0.0);
      table.string("beschrijving", 1000);
      table.string("categorie", 255).notNullable();

      table.integer("idLeverancier").unsigned().notNullable();
      table
        .foreign("idLeverancier", "fk_product_leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.product);
  },
};
