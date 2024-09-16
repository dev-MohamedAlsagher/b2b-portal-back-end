const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const roles = require("../src/core/roles");
const { initializeData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Create a database connection
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();

  const knex = getKnex();

  await getKnex()(tables.klant).delete();
  await getKnex()(tables.leverancier).delete();
  await getKnex()(tables.bedrijf).delete();
  await getKnex()(tables.adres).delete();

  await knex(tables.adres).insert([
    {
      idAdres: 1,
      straat: "tester straat1",
      nummer: "1",
      postcode: "2000",
      stad: "antwerpen",
      laatstGebruikt: new Date(2024, 3, 1, 18, 40, 24, 0),
    },
    {
      idAdres: 2,
      straat: "Test straat2",
      nummer: "2",
      postcode: "9100",
      stad: "St Nikloas City",
      laatstGebruikt: new Date(2024, 3, 1, 18, 40, 24, 0),
    },
    {
      idAdres: 3,
      straat: "Test straat3",
      nummer: "3",
      postcode: "1000",
      stad: "brusselse stad",
      laatstGebruikt: new Date(2024, 3, 1, 18, 40, 24, 0),
    },
  ]);
  await knex(tables.bedrijf).insert([
    {
      idBedrijf: 1,
      idAdres: 1,
      naam: "Test Comp1",
      logo: "Comp Logo test 1",
      sector: "sector1",
      email: "test1@example.com",
      iban: "BE68539007547034",
      btwNummer: "BE1234567890",
      telefoonnummer: "0477777777",
      gebruikerSinds: new Date(2024, 3, 1, 18, 40, 24, 0),
      isActief: true,
    },
    {
      idBedrijf: 2,
      idAdres: 2,
      naam: "Test Comp2",
      logo: "Comp Logo test 2",
      sector: "sector2",
      email: "test2@example.com",
      iban: "BE68539007547034",
      btwNummer: "BE1234567890",
      telefoonnummer: "0471234568",
      gebruikerSinds: new Date(2024, 3, 1, 18, 40, 24, 0),
      isActief: true,
    },
    {
      idBedrijf: 3,
      idAdres: 3,
      naam: "Test Comp3",
      logo: "Comp Logo test 3",
      sector: "sector3",
      email: "test3@example.com",
      iban: "BE68539007547034",
      btwNummer: "BE1234567890",
      telefoonnummer: "047758569",
      gebruikerSinds: new Date(2024, 3, 1, 18, 40, 24, 0),
      isActief: true,
    },
  ]);

  await knex(tables.leverancier).insert([
    {
      idLeverancier: 1,
      leverancierNummer: "256355",
      gebruikersnaam: "test_leverancier1",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.LEVER]),
      idBedrijf: 1,
      email: "testleverancier1@example.com",
    },
    {
      idLeverancier: 2,
      leverancierNummer: "256565",
      gebruikersnaam: "Test Leverancier User2",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.LEVER]),
      idBedrijf: 2,
      email: "testleverancier2@example.com",
    },
    {
      idLeverancier: 3,
      leverancierNummer: "256865",
      gebruikersnaam: "Test Leverancier User3",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.LEVER]),
      idBedrijf: 3,
      email: "testleverancier2@example.com",
    },
  ]);

  await knex(tables.klant).insert([
    {
      idKlant: 1,
      klantNummer: "87654321",
      gebruikersnaam: "tester_klant1",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.KLANT]),
      idBedrijf: 1,
      email: "testklant1@example.com",
    },
    {
      idKlant: 2,
      klantNummer: "87654321",
      gebruikersnaam: "Test Klant User2",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.KLANT]),
      idBedrijf: 2,
      email: "testklant2@example.com",
    },
    {
      idKlant: 3,
      klantNummer: "87654321",
      gebruikersnaam: "Test Klant User3",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      roles: JSON.stringify([roles.KLANT]),
      idBedrijf: 3,
      email: "testklant2@example.com",
    },
  ]);

  await knex(tables.product).insert([
    {
      idProduct: 1,
      idLeverancier: 2,
      naam: "kaas",
      eenheidsprijs: 4,
      btwtarief: 6,
      foto: "https://media.nu.nl/m/un2xpm3ag029_wd854/zwitserse-kaas.jpg",
      categorie: "test",
      aantal: 10,
      gewicht: 0.5,
      beschrijving: "Heerlijke Georgeaanse kaas",
    },
    {
      idProduct: 2,
      idLeverancier: 2,
      naam: "water",
      eenheidsprijs: 1,
      btwtarief: 6,
      foto: "https://assets-willemwever.kro-ncrv.nl/public/styles/hero_small/public/water.jpeg?h=a8e2b6ba&itok=ckfRmCSB",
      categorie: "test",
      aantal: 20,
      gewicht: 1.0,
      beschrijving: "Verfrissend flessenwater uit Georgië",
    },
    {
      idProduct: 3,
      idLeverancier: 2,
      naam: "brood",
      eenheidsprijs: 3,
      btwtarief: 6,
      foto: "https://www.detrog.be/_userfiles/products/500x500/20220713091003ep0676-productfoto-hires-1.jpg",
      categorie: "test",
      aantal: 15,
      gewicht: 0.75,
      beschrijving: "Versgebakken Yamanese brood",
    },
  ]);

  await knex(tables.order).insert([
    {
      idOrder: "2402011150a1b",
      idKlant: 1,
      idLeverancier: 1,
      idAdres: 1,
      datum: "2024-02-01",
      orderStatus: "niet-verzonden",
      betalingStatus: "niet betaald",
      totaalPrijs: "15.55",
    },
    {
      idOrder: "2402141205d4e",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: "2024-02-14",
      orderStatus: "in-transit",
      betalingStatus: "niet betaald",
      totaalPrijs: "20.55",
    },
    {
      idOrder: "2402241211g7h",
      idKlant: 3,
      idLeverancier: 3,
      idAdres: 2,
      datum: "2024-02-14",
      orderStatus: "in-transit",
      betalingStatus: "niet betaald",
      totaalPrijs: "20.55",
    },
  ]);

  await knex(tables.orderDetails).insert([
    {
      idOrderDetails: 1,
      eenheidsprijs: 10.5,
      aantal: 2,
      idOrder: "2402011150a1b",
      idProduct: 1,
    },
    {
      idOrderDetails: 2,
      eenheidsprijs: 15.0,
      aantal: 1,
      idOrder: "2402141205d4e",
      idProduct: 2,
    },
    {
      idOrderDetails: 3,
      eenheidsprijs: 7.5,
      aantal: 3,
      idOrder: "2402241211g7h",
      idProduct: 3,
    },
  ]);

  await knex(tables.notificatie).insert([
    {
      idNotificatie: 1,
      idOrder: "2402011150a1b",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Order",
      geopend: false,
      afgehandeld: false,
      datum: "2024-02-01",
    },
    {
      idNotificatie: 2,
      idOrder: "2402141205d4e",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Shipping",
      geopend: false,
      afgehandeld: false,
      datum: "2022-12-25",
    },
    {
      idNotificatie: 3,
      idOrder: "2402241211g7h",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Delivery",
      geopend: false,
      afgehandeld: false,
      datum: "2024-03-08",
    },
    {
      idNotificatie: 4,
      idOrder: "2402011150a1b",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Order",
      geopend: false,
      afgehandeld: false,
      datum: "2023-12-03",
    },
    {
      idNotificatie: 5,
      idOrder: "2402011150a1b",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Order",
      geopend: false,
      afgehandeld: false,
      datum: "2021-02-15",
    },
    {
      idNotificatie: 6,
      idOrder: "2402011150a1b",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu gravida nunc. Quisque id lectus at neque blandit ultrices. Suspendisse placerat mauris quis libero condimentum dictum. Phasellus sit amet quam nec lacus euismod tincidunt sed efficitur risus. Sed at accumsan elit. Nunc consequat in nunc non varius. Proin luctus aliquet facilisis. Morbi finibus ante a dapibus hendrerit.",
      onderwerp: "Order",
      geopend: false,
      afgehandeld: false,
      datum: "2024-01-17",
    },
  ]);
};
