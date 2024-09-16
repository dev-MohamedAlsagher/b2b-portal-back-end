const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const goedkeuringLeverancierService = require("../service/goedkeuringLeverancier");
const validate = require("../core/validation");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

const getLaatsteWijziging = async (ctx) => {
  try {
    const laatsteWijziging =
      await goedkeuringLeverancierService.getLaatsteWijziging(
        ctx.state.session
      );
    ctx.body = laatsteWijziging;
    ctx.status = 200;
  } catch (error) {
    if (error instanceof ServiceError && error.code === "UNAUTHORIZED") {
      ctx.status = 403;
      ctx.body = { error: "Permission denied" };
    } else {
      getLogger().error("Error occurred while fetching laatste wijziging", {
        error,
      });
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  }
};
getLaatsteWijziging.validationScheme = {};

const createGoedkeuringLeverancier = async (ctx) => {
  try {
    const {
      leverancierNummer,
      gebruikersnaam,
      email,
      isActief,
      roles,
      iban,
      btwNummer,
      telefoonnummer,
      sector,
      straat,
      nummer,
      stad,
      postcode,
    } = ctx.request.body;
    const { idLeverancier } = ctx.state.session;
    const newGoedkeuringWijziging =
      await goedkeuringLeverancierService.createGoedkeuringLeverancier(
        {
          idLeverancier,
          leverancierNummer,
          gebruikersnaam,
          email,
          isActief,
          roles,
          iban,
          btwNummer,
          telefoonnummer,
          sector,
          straat,
          nummer,
          stad,
          postcode,
        },
        ctx.state.session
      );
    ctx.body = newGoedkeuringWijziging;
    ctx.status = 201;
  } catch (error) {
    if (error instanceof ServiceError && error.code === "UNAUTHORIZED") {
      ctx.status = 403;
      ctx.body = { error: "Permission denied" };
    } else {
      getLogger().error(
        "Error occurred while creating goedkeuring for leverancier",
        { error }
      );
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  }
};
createGoedkeuringLeverancier.validationScheme = {
  body: {
    leverancierNummer: Joi.string().max(255).required(),
    gebruikersnaam: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    isActief: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required(),
    iban: Joi.string().max(255).required(),
    btwNummer: Joi.string().max(255).required(),
    telefoonnummer: Joi.string().max(255).required(),
    sector: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    nummer: Joi.string().max(255).required(),
    stad: Joi.string().max(255).required(),
    postcode: Joi.string().max(255).required(),
  },
};

module.exports = (router) => {
  const goedkeuringLeverancierRouter = new KoaRouter({
    prefix: "/goedkeuringLeverancier",
  });

  goedkeuringLeverancierRouter.get(
    "/laatsteWijziging",
    requireAuthentication,
    validate(getLaatsteWijziging.validationScheme),
    getLaatsteWijziging
  );

  goedkeuringLeverancierRouter.post(
    "/",
    requireAuthentication,
    validate(createGoedkeuringLeverancier.validationScheme),
    createGoedkeuringLeverancier
  );

  router
    .use(goedkeuringLeverancierRouter.routes())
    .use(goedkeuringLeverancierRouter.allowedMethods());
};
