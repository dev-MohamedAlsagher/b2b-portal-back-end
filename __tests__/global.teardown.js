const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.klant).delete();
  await getKnex()(tables.leverancier).delete();
  await getKnex()(tables.bedrijf).delete();
  await getKnex()(tables.adres).delete();
  await getKnex()(tables.product).delete();
  await getKnex()(tables.order).delete();
  await getKnex()(tables.orderDetails).delete();
  await getKnex()(tables.notificatie).delete();
  // Close database connection
  await shutdownData();
};
