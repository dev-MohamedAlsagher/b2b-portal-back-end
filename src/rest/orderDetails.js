const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const orderDetailsService = require("../service/orderDetails");
const validate = require("../core/validation");
const ServiceError = require("../core/serviceError");
const orderService = require("../service/order");

const getOrderDetailsById = async (ctx) => {
  try {
    const orderDetail = await orderDetailsService.getOrderDetailsById(
      ctx.params.id
    );
    const order = await orderService.getOrderById(orderDetail.idOrder); // Fetch order

    if (
      order.idKlant !== ctx.state.session.idKlant &&
      order.idLeverancier !== ctx.state.session.idLeverancier
    ) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    ctx.body = orderDetail;
  } catch (error) {
    if (error instanceof ServiceError && error.isNotFound) {
      ctx.status = 404;
      ctx.body = { message: error.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
};

getOrderDetailsById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getOrderDetailsByOrderId = async (ctx) => {
  let order;

  const orderID = ctx.params.id;

  try {
    order = await orderService.getOrderById(ctx.params.id);
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: "Order not found" };
    return;
  }

  if (
    order.idKlant !== ctx.state.session.idKlant &&
    order.idLeverancier !== ctx.state.session.idLeverancier
  ) {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
    return;
  }

  try {
    const orderDetailsId = await orderDetailsService.getOrderDetailsByOrderId(
      orderID
    );

    ctx.body = orderDetailsId;
  } catch (error) {
    ctx.body = { message: error.message };
  }
};
getOrderDetailsByOrderId.validationScheme = {
  params: {
    id: Joi.string().required(),
  },
};

/**
 * Install orderDetails routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderDetailsRouter = new KoaRouter({
    prefix: "/orderDetails",
  });

  orderDetailsRouter.get(
    "/order/:id",
    requireAuthentication,
    validate(getOrderDetailsByOrderId.validationScheme),
    getOrderDetailsByOrderId
  );

  orderDetailsRouter.get(
    "/:id",
    requireAuthentication,
    validate(getOrderDetailsById.validationScheme),
    getOrderDetailsById
  );

  router
    .use(orderDetailsRouter.routes())
    .use(orderDetailsRouter.allowedMethods());
};
