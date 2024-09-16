const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.string("idOrder").primary();
      table.integer("idKlant").unsigned().notNullable();
      table.integer("idLeverancier").unsigned().notNullable();
      table.integer("idAdres").unsigned().notNullable();
      table.timestamp("datum").notNullable();
      table.string("orderStatus").notNullable();
      table.string("betalingStatus").notNullable();
      table.double("totaalPrijs").notNullable();

      table
        .foreign("idLeverancier", "fk_Order_leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete("CASCADE");

      table
        .foreign("idKlant", "fk_Order_Klant")
        .references(`${tables.klant}.idKlant`)
        .onDelete("CASCADE");

      table
        .foreign("idAdres", "fk_Order_Adres")
        .references(`${tables.adres}.idAdres`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.order);
  },
};
