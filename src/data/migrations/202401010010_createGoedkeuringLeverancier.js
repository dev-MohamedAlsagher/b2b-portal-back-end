const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.goedkeuringleverancier, (table) => {
      table.increments("idGoedkeuringLeverancier").primary();
      table.string("leverancierNummer", 255).notNullable();
      table.string("gebruikersnaam", 50).notNullable();
      table.string("email", 50).notNullable();
      table.boolean("isActief").notNullable();
      table.jsonb("roles").notNullable();
      table.string("iban", 255).notNullable();
      table.string("btwNummer", 255).notNullable();
      table.string("telefoonnummer", 255).notNullable();
      table.string("sector", 255).notNullable();
      table.string("straat", 255).notNullable();
      table.string("nummer", 255).notNullable();
      table.string("stad", 255).notNullable();
      table.string("postcode", 255).notNullable();
      table.string("afgehandeld", 20).notNullable();
      table.date("datumAanvraag").notNullable();

      table.integer("idLeverancier").unsigned().notNullable();

      table
        .foreign("idLeverancier", "fk_GoedkeuringLeverancier_Leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.goedkeuringleverancier);
  },
};
