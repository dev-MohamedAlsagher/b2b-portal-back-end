const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.orderDetails).delete();

    await knex(tables.orderDetails).insert([
      {
        idOrderDetails: 1,
        eenheidsprijs: 700,
        aantal: 5,
        idOrder: "2402011150a1b",
        idProduct: 1,
      },
      {
        idOrderDetails: 2,
        eenheidsprijs: 2500,
        aantal: 8,
        idOrder: "2402011150a1b",
        idProduct: 2,
      },
      {
        idOrderDetails: 3,
        eenheidsprijs: 900,
        aantal: 10,
        idOrder: "2402141205d4e",
        idProduct: 3,
      },

      // Order 3
      {
        idOrderDetails: 4,
        eenheidsprijs: 1500,
        aantal: 3,
        idOrder: "2402241211g7h",
        idProduct: 4,
      },

      // Order 4
      {
        idOrderDetails: 5,
        eenheidsprijs: 1800,
        aantal: 6,
        idOrder: "202403192NybA",
        idProduct: 5,
      },

      // Order 5
      {
        idOrderDetails: 6,
        eenheidsprijs: 1200,
        aantal: 4,
        idOrder: "20240319Dg7pQ",
        idProduct: 6,
      },
      {
        idOrderDetails: 7,
        eenheidsprijs: 2100,
        aantal: 7,
        idOrder: "20240319Vf6mR",
        idProduct: 7,
      },
      {
        idOrderDetails: 8,
        eenheidsprijs: 1350,
        aantal: 9,
        idOrder: "20240319Rp3sG",
        idProduct: 8,
      },
      {
        idOrderDetails: 9,
        eenheidsprijs: 1650,
        aantal: 5,
        idOrder: "20240319Mz8tF",
        idProduct: 9,
      },
      {
        idOrderDetails: 10,
        eenheidsprijs: 2000,
        aantal: 8,
        idOrder: "20240319Nt2sF",
        idProduct: 10,
      },
      {
        idOrderDetails: 11,
        eenheidsprijs: 1400,
        aantal: 6,
        idOrder: "20240319Pw4uF",
        idProduct: 11,
      },
      {
        idOrderDetails: 12,
        eenheidsprijs: 1900,
        aantal: 3,
        idOrder: "20240319Rx6vF",
        idProduct: 12,
      },
      {
        idOrderDetails: 13,
        eenheidsprijs: 1550,
        aantal: 5,
        idOrder: "20240319Sz8wF",
        idProduct: 13,
      },
      {
        idOrderDetails: 14,
        eenheidsprijs: 1750,
        aantal: 7,
        idOrder: "20240319Ub0xF",
        idProduct: 14,
      },
      {
        idOrderDetails: 15,
        eenheidsprijs: 1450,
        aantal: 4,
        idOrder: "20240319Vc2yF",
        idProduct: 15,
      },
      {
        idOrderDetails: 16,
        eenheidsprijs: 1600,
        aantal: 6,
        idOrder: "20240319Wd4zF",
        idProduct: 16,
      },
      {
        idOrderDetails: 17,
        eenheidsprijs: 1950,
        aantal: 5,
        idOrder: "20240401Ab1cD",
        idProduct: 17,
      },
      {
        idOrderDetails: 18,
        eenheidsprijs: 1700,
        aantal: 7,
        idOrder: "20240405Cd2eF",
        idProduct: 18,
      },
    ]);
  },
};
