const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete();

    await knex(tables.klant).insert([
      {
        idKlant: 1,
        klantNummer: "87654321",
        gebruikersnaam: "klant1",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 1,
        email: "lucaskatamadze.opleiding@gmail.com",
      },

      {
        idKlant: 2,
        klantNummer: "87654321",
        gebruikersnaam: "klant2",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 2,
        email: "klant2@example.com",
      },

      {
        idKlant: 3,
        klantNummer: "87654321",
        gebruikersnaam: "klant3",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 3,
        email: "klant3@example.com",
      },
      {
        idKlant: 4,
        klantNummer: "43629272",
        gebruikersnaam: "klant4",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 4,
        email: "klant4@example.com",
      },
      {
        idKlant: 5,
        klantNummer: "94803174",
        gebruikersnaam: "klant5",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 5,
        email: "klant5@example.com",
      },

      {
        idKlant: 6,
        klantNummer: "74316574",
        gebruikersnaam: "klant6",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 6,
        email: "klant6@gmail.com",
      },

      {
        idKlant: 7,
        klantNummer: "34153796",
        gebruikersnaam: "klant7",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 7,
        email: "klant7@example.com",
      },

      {
        idKlant: 8,
        klantNummer: "93623123",
        gebruikersnaam: "klant8",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 8,
        email: "klant8@example.com",
      },
      {
        idKlant: 9,
        klantNummer: "54729052",
        gebruikersnaam: "klant9",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 9,
        email: "klant9@example.com",
      },
      {
        idKlant: 10,
        klantNummer: "10417864",
        gebruikersnaam: "klant10",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 10,
        email: "klant10@example.com",
      },
      {
        idKlant: 11,
        klantNummer: "45209807",
        gebruikersnaam: "klant11",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 11,
        email: "klant11@example.com",
      },

      {
        idKlant: 12,
        klantNummer: "83152887",
        gebruikersnaam: "klant12",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 12,
        email: "klant12@gmail.com",
      },

      {
        idKlant: 13,
        klantNummer: "93176438",
        gebruikersnaam: "klant13",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 13,
        email: "klant13@example.com",
      },

      {
        idKlant: 14,
        klantNummer: "17412943",
        gebruikersnaam: "klant14",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 14,
        email: "klant14@example.com",
      },
      {
        idKlant: 15,
        klantNummer: "23415734",
        gebruikersnaam: "klant15",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 15,
        email: "klant15@example.com",
      },
    ]);
  },
};
