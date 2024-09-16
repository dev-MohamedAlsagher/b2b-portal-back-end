const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
  seed: async (knex) => {
    await knex(tables.leverancier).delete();

    await knex(tables.leverancier).insert([
      {
        idLeverancier: 1,
        leverancierNummer: "87654321",
        gebruikersnaam: "leverancier1",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 1,
        email: "lucaskatamadze.opleiding@gmail.com",
        betaalmethodes: "[PayPal, Visa, Mastercard, Bancontact]",
      },

      {
        idLeverancier: 2,
        leverancierNummer: "34283567",
        gebruikersnaam: "leverancier2",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 2,
        email: "leverancier2@example.com",
        betaalmethodes: "[Bancontact, Klarna]",
      },

      {
        idLeverancier: 3,
        leverancierNummer: "93628123",
        gebruikersnaam: "leverancier3",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 3,
        email: "leverancier3@example.com",
        // betaalmethodes: "Bancontact, Domiciliëring",
      },
      {
        idLeverancier: 4,
        leverancierNummer: "43629572",
        gebruikersnaam: "leverancier4",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 4,
        email: "leverancier4@example.com",
      },
      {
        idLeverancier: 5,
        leverancierNummer: "94803274",
        gebruikersnaam: "leverancier5",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 5,
        email: "leverancier5@example.com",
      },

      {
        idLeverancier: 6,
        leverancierNummer: "74396574",
        gebruikersnaam: "leverancier6",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 6,
        email: "leverancier6@gmail.com",
        // betaalmethodes: "PayPal, Visa, Mastercard, Bancontact",
      },

      {
        idLeverancier: 7,
        leverancierNummer: "34253796",
        gebruikersnaam: "leverancier7",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 7,
        email: "leverancier7@example.com",
        // betaalmethodes: "Visa, Factuur",
      },

      {
        idLeverancier: 8,
        leverancierNummer: "93628123",
        gebruikersnaam: "leverancier8",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 8,
        email: "leverancier8@example.com",
        // betaalmethodes: "Bancontact, Domiciliëring",
      },
      {
        idLeverancier: 9,
        leverancierNummer: "54729052",
        gebruikersnaam: "leverancier9",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 9,
        email: "leverancier9@example.com",
      },
      {
        idLeverancier: 10,
        leverancierNummer: "10427864",
        gebruikersnaam: "leverancier10",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 10,
        email: "leverancier10@example.com",
      },
      {
        idLeverancier: 11,
        leverancierNummer: "45209807",
        gebruikersnaam: "leverancier11",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 11,
        email: "leverancier11@example.com",
      },

      {
        idLeverancier: 12,
        leverancierNummer: "83752887",
        gebruikersnaam: "leverancier12",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 12,
        email: "leverancier12@gmail.com",
        // betaalmethodes: "PayPal, Visa, Mastercard, Bancontact",
      },

      {
        idLeverancier: 13,
        leverancierNummer: "93176538",
        gebruikersnaam: "leverancier13",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 13,
        email: "leverancier13@example.com",
        // betaalmethodes: "Visa, Factuur",
      },

      {
        idLeverancier: 14,
        leverancierNummer: "17462943",
        gebruikersnaam: "leverancier14",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 14,
        email: "leverancier14@example.com",
        // betaalmethodes: "Bancontact, Domiciliëring",
      },
      {
        idLeverancier: 15,
        leverancierNummer: "23415834",
        gebruikersnaam: "leverancier15",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 15,
        email: "leverancier15@example.com",
      },
    ]);
  },
};
