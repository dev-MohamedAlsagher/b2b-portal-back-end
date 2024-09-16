const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringleverancier).delete();

    await knex(tables.goedkeuringleverancier).insert([
      {
        idGoedkeuringLeverancier: 1,
        leverancierNummer: "34283567",
        gebruikersnaam: "supplier1",
        email: "leverancier2@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
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
        idLeverancier: 2,
      },
      {
        idGoedkeuringLeverancier: 2,
        leverancierNummer: "87654321",
        gebruikersnaam: "supplier2",
        email: "supplier2@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0006543210",
        btwNummer: "NL987654321B01",
        telefoonnummer: "0623456789",
        sector: "Clothing",
        straat: "Supplier Avenue",
        nummer: "2",
        stad: "Supplier Town",
        postcode: "5678CD",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 15, 7),
        idLeverancier: 1,
      },
      {
        idGoedkeuringLeverancier: 3,
        leverancierNummer: "93628123",
        gebruikersnaam: "supplier3",
        email: "supplier3@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0009876543",
        btwNummer: "NL987654321B02",
        telefoonnummer: "0634567890",
        sector: "Furniture",
        straat: "Supplier Lane",
        nummer: "3",
        stad: "Supplier Village",
        postcode: "9012EF",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 10, 12),
        idLeverancier: 9,
      },
      {
        idGoedkeuringLeverancier: 4,
        leverancierNummer: "43629572",
        gebruikersnaam: "supplier4",
        email: "supplier4@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0001357924",
        btwNummer: "NL135792468B01",
        telefoonnummer: "0645678901",
        sector: "Books",
        straat: "Supplier Road",
        nummer: "4",
        stad: "Supplier City",
        postcode: "2345BC",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 5, 20),
        idLeverancier: 4,
      },
      {
        idGoedkeuringLeverancier: 5,
        leverancierNummer: "94803274",
        gebruikersnaam: "supplier5",
        email: "supplier5@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0002468135",
        btwNummer: "NL246813579B01",
        telefoonnummer: "0656789012",
        sector: "Food",
        straat: "Supplier Boulevard",
        nummer: "5",
        stad: "Supplier Town",
        postcode: "3456DE",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 8, 15),
        idLeverancier: 5,
      },
      {
        idGoedkeuringLeverancier: 6,
        leverancierNummer: "74396574",
        gebruikersnaam: "supplier6",
        email: "supplier6@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0003692586",
        btwNummer: "NL369258147B01",
        telefoonnummer: "0667890123",
        sector: "Toys",
        straat: "Supplier Drive",
        nummer: "6",
        stad: "Supplier Village",
        postcode: "4567EF",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 12, 8),
        idLeverancier: 6,
      },
      {
        idGoedkeuringLeverancier: 7,
        leverancierNummer: "34253796",
        gebruikersnaam: "supplier7",
        email: "supplier7@example.com",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0007894567",
        btwNummer: "NL789456123B01",
        telefoonnummer: "0678901234",
        sector: "Home Appliances",
        straat: "Supplier Lane",
        nummer: "7",
        stad: "Supplier City",
        postcode: "5678FG",
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(2022, 3, 25),
        idLeverancier: 7,
      },
    ]);
}}