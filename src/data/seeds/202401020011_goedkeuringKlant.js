const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringklant).delete();

    await knex(tables.goedkeuringklant).insert([
      {
        idGoedkeuringKlant: 1,
        klantNummer: "87654321",
        gebruikersnaam: "john_doe",
        email: "buyer3@example.com",
        isActief: true,
        roles: JSON.stringify([Role.KLANT]),
        iban: "NL20INGB0001234567",
        btwNummer: "NL123456789B01",
        telefoonnummer: "0612345678",
        sector: "Electronics",
        straat: "Supplier Street",
        nummer: "1",
        stad: "Supplier City",
        postcode: "1234AB",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 20, 3),
        idKlant: 3,
      },
    ]);
}}