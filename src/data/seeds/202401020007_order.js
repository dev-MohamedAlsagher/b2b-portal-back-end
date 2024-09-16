const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).delete();

    await knex(tables.order).insert([{
      idOrder: "2402011150a1b",
      idKlant: 1,
      idLeverancier: 2,
      idAdres: 1,
      datum: '2024-02-01',
      orderStatus: 'niet-verzonden',
      betalingStatus: '1',
      totaalPrijs: '15.55',
    },

    {
      idOrder: "2402141205d4e",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: '2024-02-14',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55',
    },
    {
      idOrder: "2402241211g7h",
      idKlant: 3,
      idLeverancier: 3,
      idAdres: 3,
      datum: '2024-02-24',
      orderStatus: 'geleverd',
      betalingStatus: '1',
      totaalPrijs: '25.55',
    },
    {
      idOrder: "202403192NybA",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '1',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Dg7pQ",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Vf6mR",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Rp3sG",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Mz8tF",
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Nt2sF",
      idKlant: 9,
      idLeverancier: 9,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Pw4uF",
      idKlant: 10,
      idLeverancier: 10,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Rx6vF",
      idKlant: 11,
      idLeverancier: 11,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Sz8wF",
      idKlant: 12,
      idLeverancier: 12,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Ub0xF",
      idKlant: 13,
      idLeverancier: 13,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Vc2yF",
      idKlant: 14,
      idLeverancier: 14,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240319Wd4zF",
      idKlant: 15,
      idLeverancier: 15,
      idAdres: 1,
      datum: '2024-03-19',
      orderStatus: 'in-transit',
      betalingStatus: '0',
      totaalPrijs: '20.55'
    },
    {
      idOrder: "20240401Ab1cD",
      idKlant: 7,
      idLeverancier: 7,
      idAdres: 1,
      datum: '2024-04-01',
      orderStatus: 'in-transit',
      betalingStatus: '1',
      totaalPrijs: '22.99'
    },
    {
      idOrder: "20240405Cd2eF",
      idKlant: 6,
      idLeverancier: 6,
      idAdres: 1,
      datum: '2024-04-05',
      orderStatus: 'niet-verzonden',
      betalingStatus: '0',
      totaalPrijs: '18.75'
    },

    
    ]);
  },
}