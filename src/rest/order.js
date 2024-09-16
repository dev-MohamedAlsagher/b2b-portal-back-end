const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const orderService = require("../service/order");
const validate = require("../core/validation");
const Role = require("../core/roles");

const getOrderById = async (ctx) => {
  try {
    const orderId = ctx.params.id;
    const order = await orderService.getOrderById(orderId);
    if (
      order.idKlant !== ctx.state.session.idKlant &&
      order.idLeverancier !== ctx.state.session.idLeverancier
    ) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    ctx.body = order;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
};

getOrderById.validationScheme = {
  params: {
    id: Joi.string().required(),
  },
};

const createOrder = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const {
    idLeverancier,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
    adres,
    products,
  } = ctx.request.body;
  try {
    const newOrder = await orderService.createOrder(idKlant, {
      idLeverancier,
      datum: new Date(datum),
      orderStatus,
      betalingStatus,
      totaalPrijs,
      adres,
      products,
    });

    ctx.body = newOrder;
    ctx.status = 201;
  } catch (error) {
    if (error.status === 403) {
      ctx.body = { message: "Permission denied" };
    }
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
};

createOrder.validationScheme = {
  body: {
    idLeverancier: Joi.number().positive().required(),
    datum: Joi.date().required(),
    orderStatus: Joi.string().required(),
    betalingStatus: Joi.string().required(),
    totaalPrijs: Joi.number().positive().required(),
    adres: Joi.object().keys({
      straat: Joi.string().required(),
      stad: Joi.string().required(),
      nummer: Joi.string().required(),
      postcode: Joi.string().required(),
    }),
    products: Joi.array()
      .items(
        Joi.object().keys({
          eenheidsprijs: Joi.number().required(),
          aantal: Joi.number().required(),
          idProduct: Joi.number().required(),
        })
      )
      .required(),
  },
};

const updateOrderById = async (ctx) => {
  const { orderStatus, betalingStatus } = ctx.request.body;
  const orderId = ctx.params.id;
  const idKlant = ctx.state.session.idKlant;
  const idLeverancier = ctx.state.session.idLeverancier;

  let order;

  try {
    order = await orderService.getOrderById(orderId);
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: "Order not found" };
    return;
  }

  let updateFields = {};
  if (order.idKlant === idKlant) {
    updateFields = { betalingStatus: betalingStatus };
    if (orderStatus !== undefined) {
      ctx.status = 403;
      ctx.body = { message: "Klant cannot update orderStatus" };
      return;
    }
  } else if (order.idLeverancier === idLeverancier) {
    updateFields = { orderStatus: orderStatus, betalingStatus: betalingStatus };
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
    return;
  }

  try {
    ctx.body = await orderService.updateOrderById(orderId, updateFields);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
};
updateOrderById.validationScheme = {
  params: {
    id: Joi.string().required(),
  },
  body: {
    orderStatus: Joi.string().optional(),
    betalingStatus: Joi.string().optional(),
  },
};

const getOrderByKlant = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const { begin, aantal } = ctx.params;

  try {
    const ordersKlant = await orderService.getOrderByKlantId(
      idKlant,
      begin,
      aantal
    );
    ctx.status = 200;
    ctx.body = ordersKlant;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
};

getOrderByKlant.validationScheme = {
  params: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive().optional(),
  },
};

const getOrderByLeverancier = async (ctx) => {
  const idLeverancier = ctx.state.session.idLeverancier;
  const { begin, aantal } = ctx.params;
  try {
    const ordersLeverancier = await orderService.getOrderByLeverancierId(
      idLeverancier,
      begin,
      aantal
    );
    ctx.status = 200;
    ctx.body = ordersLeverancier;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
};

getOrderByLeverancier.validationScheme = {
  params: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive().optional(),
  },
};

const requireLeverancier = makeRequireRole(Role.LEVER);
const requireKlant = makeRequireRole(Role.KLANT);

/**
 * Install order routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderRouter = new KoaRouter({
    prefix: "/order",
  });

  orderRouter.post(
    "/",
    requireAuthentication,
    requireKlant,
    validate(createOrder.validationScheme),
    createOrder
  );

  orderRouter.put(
    "/:id",
    requireAuthentication,
    validate(updateOrderById.validationScheme),
    updateOrderById
  );
  orderRouter.get(
    "/klant/:begin/:aantal",
    requireAuthentication,
    requireKlant,
    validate(getOrderByKlant.validationScheme),
    getOrderByKlant
  );
  orderRouter.get(
    "/leverancier/:begin/:aantal",
    requireAuthentication,
    requireLeverancier,
    validate(getOrderByLeverancier.validationScheme),
    getOrderByLeverancier
  );

  orderRouter.get(
    "/:id",
    requireAuthentication,
    validate(getOrderById.validationScheme),
    getOrderById
  );
  router.use(orderRouter.routes()).use(orderRouter.allowedMethods());
};
