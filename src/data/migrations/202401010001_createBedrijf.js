const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.bedrijf, (table) => {
      table.increments("idBedrijf").primary();
      table.string("naam", 255).notNullable().unique();
      table.string("logo", 255).notNullable();
      table.string("sector", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("iban", 255).notNullable();
      table.string("btwNummer", 255).notNullable();
      table.string("telefoonnummer", 255).notNullable();
      table.timestamp("gebruikerSinds").notNullable();
      table.integer("idAdres").unsigned().notNullable();
      table.boolean("isActief");

      table
        .foreign("idAdres", "fk_bedrijf_adres")
        .references(`${tables.adres}.idAdres`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.bedrijf);
  },
};
