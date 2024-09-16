const KoaRouter = require("@koa/router");
const validate = require("../core/validation");
const userService = require("../service/users");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");
const Joi = require("joi");

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const token = await userService.loginLeverancier(username, password);
  ctx.body = token;
};

login.validationScheme = {
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const getLeverancier = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const leverancier = await userService.getLeverancierById(idLeverancier);

    if (leverancier) {
      ctx.status = 200;
      ctx.body = leverancier;
    } else {
      ctx.status = 404;
      ctx.body = { message: "leverancier not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching leverancier data" };
  }
};

getLeverancier.validationScheme = null;

const forgotPassword = async (ctx) => {
  try {
    const { username, email } = ctx.request.body;
    const resetPassword = await userService.forgotPasswordLeverancier(
      email,
      username
    );
    ctx.status = 200;
    (ctx.body = "password reseted"), resetPassword;
  } catch (error) {
    ctx.body = "error during resetting password:";
  }
};

forgotPassword.validationScheme = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};

const updateLeverancier = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const body = ctx.request.body;
    const updateLeverancier = await userService.updateLeverancier(
      idLeverancier,
      body
    );
    if (updateLeverancier) {
      ctx.status = 200;
      ctx.body = updateLeverancier;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
  }
};
updateLeverancier.validationScheme = {
  body: {
    username: Joi.string().optional(),
    password: Joi.string().optional(),
  },
};

const deleteLeverancier = async (ctx) => {
  const { idLeverancier } = ctx.state.session;
  const deletedUser = await userService.deleteLeverancier(idLeverancier);
  if (deletedUser) {
    ctx.status = 200;
    ctx.body = { message: "Leverancier deleted" };
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
  }
};

deleteLeverancier.validationScheme = {};

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: "/leverancier",
  });
  // public
  userRouter.post("/login", validate(login.validationScheme), login);
  userRouter.get(
    "/",
    requireAuthentication,
    validate(getLeverancier.validationScheme),
    getLeverancier
  );
  userRouter.post(
    "/reset",
    validate(forgotPassword.validationScheme),
    forgotPassword
  );

  userRouter.put(
    "/",
    requireAuthentication,
    validate(updateLeverancier.validationScheme),
    updateLeverancier
  );

  userRouter.delete(
    "/",
    requireAuthentication,
    validate(deleteLeverancier.validationScheme),
    deleteLeverancier
  );

  router.use(userRouter.routes()).use(router.allowedMethods());
};
