const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.leverancier, (table) => {
      table.increments("idLeverancier").primary();
      table.string("leverancierNummer", 255).notNullable();
      table.string("gebruikersnaam", 50).notNullable();
      table.string("email", 50).notNullable();
      table.string("password_hash").notNullable();
      table.jsonb("roles").notNullable();
      table.string("betaalmethodes", 255);
      table.integer("idBedrijf").unsigned().notNullable();

      table
        .foreign("idBedrijf", "fk_Leverancier_Bedrijf")
        .references(`${tables.bedrijf}.idBedrijf`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.leverancier);
  },
};
