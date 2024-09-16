const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.adres).delete(); 

    await knex(tables.adres).insert([{

        idAdres: 1,
        straat: 'tesstraat',
        nummer: "1",
        postcode: "4000",
        stad: 'antwerpen',
        laatstGebruikt: '2022-02-22',
      },
      {
        idAdres: 2,
        straat: 'tesstraat',
        nummer: "1",
        postcode: "4000",
        stad: 'antwerpen',
        laatstGebruikt: '2022-02-22',
        
      },
      {
        idAdres: 3,
        straat: 'tesstraat',
        nummer: "1",
        postcode: "4000",
        stad: 'antwerpen',
        laatstGebruikt: '2022-02-22',
        
      },
    ]);
  },
}