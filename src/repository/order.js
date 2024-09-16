const { getKnex, tables } = require("../data");
const { v4: uuidv4 } = require("uuid");

const formatOrder = (result) => ({
  idOrder: result.idOrder,
  idKlant: result.idKlant,
  idLeverancier: result.idLeverancier,
  idAdres: result.idAdres,
  datum: result.datum,
  orderStatus: result.orderStatus,
  betalingStatus: result.betalingStatus,
  totaalPrijs: result.totaalPrijs,
});

const getAllOrders = async () => {
  return getKnex()(tables.order).select("*").orderBy("datum", "desc");
};

const getOrderById = async (idOrder) => {
  const order = await getKnex()(tables.order)
    .leftJoin(
      `${tables.orderDetails}`,
      `${tables.order}.idOrder`,
      `${tables.orderDetails}.idOrder`
    )
    .leftJoin(
      `${tables.leverancier}`,
      `${tables.order}.idLeverancier`,
      `${tables.leverancier}.idLeverancier`
    )

    .where(`${tables.order}.idOrder`, idOrder)
    .first();

  return formatOrder(order);
};

const getOrderByKlantId = async (idKlant, begin, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;
  const orders = await getKnex()(tables.order)
    .where("idKlant", idKlant)
    .orderBy("betalingStatus", "asc")
    .orderBy("datum", "asc")
    .limit(pageSize)
    .offset(offset);

  return orders;
};

const getOrderByLeverancierId = async (idLeverancier, begin, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;
  const orders = await getKnex()(tables.order)
    .where("idLeverancier", idLeverancier)
    .orderBy("betalingStatus", "asc")
    .orderBy("datum", "asc")
    .limit(pageSize)
    .offset(offset);

  return orders;
};

const createOrder = async (
  idKlant,
  { idLeverancier, idAdres, datum, orderStatus, betalingStatus, totaalPrijs }
) => {
  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const counter = uuidv4().replace(/-/g, "").substring(0, 3);

  const idOrder = `${year}${month}${day}${hour}${minute}${counter}`;

  await getKnex()(tables.order).insert({
    idOrder: idOrder,
    idKlant,
    idLeverancier,
    idAdres,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
  });
  return idOrder;
};

const updateOrderById = async (idOrder, updateFields) => {
  const updatedOrderId = await getKnex()(tables.order)
    .where("idOrder", idOrder)
    .update(updateFields);

  return updatedOrderId;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  getOrderByKlantId,
  getOrderByLeverancierId,
};
