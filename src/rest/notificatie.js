const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const notificationService = require("../service/notificatie");
const validate = require("../core/validation");
const Role = require("../core/roles");
const { getLogger } = require("../core/logging");

const getNotificationById = async (ctx) => {
  let notification;
  const idNotificatie = ctx.params.id;
  try {
    try {
      notification = await notificationService.getNotificationById(
        idNotificatie
      );
    } catch (error) {
      console.log(error.message);
      ctx.status = 404;
      ctx.body = error.message;
    }

    getLogger().info(
      `Notification with ID ${ctx.params.id} retrieved successfully`
    );
    ctx.body = notification;
  } catch (error) {
    getLogger().error(
      `Error occurred while retrieving notification with ID ${ctx.params.id}`,
      { error }
    );
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
getNotificationById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createNotification = async (ctx) => {
  try {
    const { idOrder, text, onderwerp, geopend, afgehandeld, datum } =
      ctx.request.body;
    const newNotification = await notificationService.createNotification({
      idOrder,
      text,
      onderwerp,
      geopend,
      afgehandeld,
      datum,
    });
    getLogger().info("New notification created successfully", {
      newNotification,
    });
    ctx.body = newNotification;
    ctx.status = 201;
  } catch (error) {
    getLogger().error("Error occurred while creating new notification", {
      error,
    });
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
createNotification.validationScheme = {
  body: {
    idOrder: Joi.string().required(),
    text: Joi.string().required(),
    onderwerp: Joi.string().required(),
    geopend: Joi.boolean().required(),
    afgehandeld: Joi.boolean().required(),
    datum: Joi.date().optional(),
  },
};

const updateNotificationById = async (ctx) => {
  try {
    const { idOrder, text, onderwerp, geopend, afgehandeld, datum } =
      ctx.request.body;

    const updatedNotification =
      await notificationService.updateNotificationById(ctx.params.id, {
        idOrder,
        text,
        onderwerp,
        geopend,
        afgehandeld,
        datum,
      });
    getLogger().info(
      `Notification with ID ${ctx.params.id} updated successfully`,
      { updatedNotification }
    );
    ctx.body = updatedNotification;
    ctx.status = 200;
  } catch (error) {
    getLogger().error(
      `Error occurred while updating notification with ID ${ctx.params.id}`,
      { error }
    );
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
updateNotificationById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    idOrder: Joi.string(),
    text: Joi.string(),
    onderwerp: Joi.string(),
    geopend: Joi.boolean(),
    afgehandeld: Joi.boolean(),
    datum: Joi.date(),
  },
};

const getAllNotificationsByKlantId = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const { begin } = ctx.params;
  const { aantal } = ctx.params;
  try {
    const notificatieKlant =
      await notificationService.getAllNotificationsByKlantId(
        idKlant,
        begin,
        aantal
      );
    getLogger().info(
      `Notifications for Klant with ID ${idKlant} retrieved successfully`
    );
    ctx.status = 200;
    ctx.body = notificatieKlant;
  } catch (error) {
    getLogger().error(
      `Error occurred while retrieving notifications for Klant with ID ${idKlant}`,
      { error }
    );
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || "Internal Server Error" };
  }
};

getAllNotificationsByKlantId.validationScheme = {
  params: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive(),
  },
};

const getAllNotificationsByLeverancierId = async (ctx) => {
  const idLeverancier = ctx.state.session.idLeverancier;
  const { begin } = ctx.params;
  const { aantal } = ctx.params;
  try {
    const notifications =
      await notificationService.getAllNotificationsByLeverancierId(
        idLeverancier,
        begin,
        aantal
      );
    getLogger().info(
      `Notifications for Leverancier with ID ${idLeverancier} retrieved successfully`
    );
    ctx.status = 200;
    ctx.body = notifications;
  } catch (error) {
    getLogger().error(
      `Error occurred while retrieving notifications for Leverancier with ID ${idLeverancier}`,
      { error }
    );
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || "Internal Server Error" };
  }
};

getAllNotificationsByLeverancierId.validationScheme = {
  params: {
    begin: Joi.number().optional(),
    aantal: Joi.number().positive(),
  },
};

const countUnopenedNotificationsByKlantId = async (ctx) => {
  try {
    const unopenedCount =
      await notificationService.countUnopenedNotificationsByKlantId(
        ctx.params.id
      );
    getLogger().info(
      `Unopened notification count for Klant with ID ${ctx.params.id} retrieved successfully`
    );
    ctx.status = 200;
    ctx.body = unopenedCount;
  } catch (error) {
    getLogger().error(
      `Error occurred while retrieving unopened notification count for Klant with ID ${ctx.params.id}`,
      { error }
    );
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || "Internal Server Error" };
  }
};
countUnopenedNotificationsByKlantId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const countUnopenedNotificationsByLeverancierId = async (ctx) => {
  try {
    const unopenedCount =
      await notificationService.countUnopenedNotificationsByLeverancierId(
        ctx.params.id
      );
    getLogger().info(
      `Unopened notification count for Leverancier with ID ${ctx.params.id} retrieved successfully`
    );

    ctx.status = 200;
    ctx.body = unopenedCount;
  } catch (error) {
    getLogger().error(
      `Error occurred while retrieving unopened notification count for Leverancier with ID ${ctx.params.id}`,
      { error }
    );
    ctx.status = error.status || 500;
    ctx.body = { message: error.message || "Internal Server Error" };
  }
};
countUnopenedNotificationsByLeverancierId.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const checkKlantId = (ctx, next) => {
  const { idKlant, roles } = ctx.state.session;
  const { id } = ctx.params;

  if (Number(id) !== idKlant && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      "U hebt geen toestemming om deze gebruiker te bekijken",
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

const checkLeverancierId = (ctx, next) => {
  const { idLeverancier, roles } = ctx.state.session;
  const { id } = ctx.params;

  if (Number(id) !== idLeverancier && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      "U hebt geen toestemming om deze gebruiker te bekijken",
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

const checkId = async (ctx, next) => {
  const { idLeverancier, idKlant, roles } = ctx.state.session;
  const { id } = ctx.params;

  const notification = await notificationService.getNotificationById(
    Number(id)
  );

  if (
    notification.idLeverancier !== idLeverancier &&
    notification.idKlant !== idKlant &&
    !roles.includes(Role.ADMIN)
  ) {
    return ctx.throw(
      403,
      `U hebt geen toestemming om deze notificatie te bekijken`,
      {
        code: "FORBIDDEN",
      }
    );
  }
  return next();
};

const requireKlant = makeRequireRole(Role.KLANT);
const requireLeverancier = makeRequireRole(Role.LEVER);
/**
 * Install notification routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const notificationRouter = new KoaRouter({
    prefix: "/notificatie",
  });

  notificationRouter.post(
    "/",
    requireAuthentication,
    validate(createNotification.validationScheme),
    createNotification
  );

  notificationRouter.get(
    "/klant/:begin/:aantal",
    requireAuthentication,
    requireKlant,
    validate(getAllNotificationsByKlantId.validationScheme),
    getAllNotificationsByKlantId
  );

  notificationRouter.get(
    "/leverancier/:begin/:aantal",
    requireAuthentication,
    requireLeverancier,
    validate(getAllNotificationsByLeverancierId.validationScheme),
    getAllNotificationsByLeverancierId
  );
  notificationRouter.get(
    "/:id",
    requireAuthentication,
    validate(getNotificationById.validationScheme),
    checkId,
    getNotificationById
  );

  notificationRouter.put(
    "/:id",
    requireAuthentication,
    validate(updateNotificationById.validationScheme),
    checkId,
    updateNotificationById
  );

  notificationRouter.get(
    "/ongeopend/klant/:id",
    requireAuthentication,
    validate(countUnopenedNotificationsByKlantId.validationScheme),
    checkKlantId,
    countUnopenedNotificationsByKlantId
  );

  notificationRouter.get(
    "/ongeopend/leverancier/:id",
    requireAuthentication,
    validate(countUnopenedNotificationsByLeverancierId.validationScheme),
    checkLeverancierId,
    countUnopenedNotificationsByLeverancierId
  );

  router
    .use(notificationRouter.routes())
    .use(notificationRouter.allowedMethods());
};
