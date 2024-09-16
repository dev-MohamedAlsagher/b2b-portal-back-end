const KoaRouter = require("@koa/router");
const validate = require("../core/validation");
const userService = require("../service/users");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const token = await userService.loginKlant(username, password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const forgotPassword = async (ctx) => {
  try {
    const { username, email } = ctx.request.body;
    const resetPassword = await userService.forgotPasswordKlant(
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

const getKlant = async (ctx) => {
  try {
    const { idKlant } = ctx.state.session;
    const klant = await userService.getKlantById(idKlant);
    if (klant) {
      ctx.status = 200;
      ctx.body = klant;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Klant not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching klant data" };
  }
};
getKlant.validationScheme = null;

const updateKlant = async (ctx) => {
  try {
    const { idKlant } = ctx.state.session;
    const body = ctx.request.body;
    const updateKlant = await userService.updateKlant(idKlant, body);
    if (updateKlant) {
      ctx.status = 200;
      ctx.body = updateKlant;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
  }
};

updateKlant.validationScheme = {
  body: {
    username: Joi.string().optional(),
    password: Joi.string().optional(),
  },
};

const deleteKlant = async (ctx) => {
  const { idKlant } = ctx.state.session;
  const deletedUser = await userService.deleteKlant(idKlant);
  if (deletedUser) {
    ctx.status = 200;
    ctx.body = { message: "Klant deleted" };
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
  }
};

deleteKlant.validationScheme = {};

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: "/klant",
  });
  // public
  userRouter.post("/login", validate(login.validationScheme), login);
  userRouter.get(
    "/",
    requireAuthentication,
    validate(getKlant.validationScheme),
    getKlant
  );
  userRouter.post(
    "/reset",
    validate(forgotPassword.validationScheme),
    forgotPassword
  );

  userRouter.put(
    "/",
    requireAuthentication,
    validate(updateKlant.validationScheme),
    updateKlant
  );

  userRouter.delete(
    "/",
    requireAuthentication,
    validate(deleteKlant.validationScheme),
    deleteKlant
  );

  router.use(userRouter.routes()).use(router.allowedMethods());
};
