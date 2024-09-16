const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.orderDetails, (table) => {
      table.increments("idOrderDetails").primary();

      table.double("eenheidsprijs").notNullable();
      table.integer("aantal").notNullable();

      table.string("idOrder").notNullable();
      table.integer("idProduct").unsigned().notNullable();

      table
        .foreign("idOrder", "fk_OrderDetails_Order")
        .references(`${tables.order}.idOrder`)
        .onDelete("CASCADE");

      table
        .foreign("idProduct", "fk_OrderDetails_Product")
        .references(`${tables.product}.idProduct`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.orderDetails);
  },
};
