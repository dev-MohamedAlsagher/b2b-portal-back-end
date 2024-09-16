const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const goedkeuringKlantService = require("../service/goedkeuringKlant");
const validate = require("../core/validation");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

const getLaatsteWijziging = async (ctx) => {
  try {
    const laatsteWijziging = await goedkeuringKlantService.getLaatsteWijziging(
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

const createGoedkeuringKlant = async (ctx) => {
  try {
    const {
      klantNummer,
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
    const { idKlant } = ctx.state.session;
    const newGoedkeuringWijziging =
      await goedkeuringKlantService.createGoedkeuringKlant(
        {
          idKlant,
          klantNummer,
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
      getLogger().error("Error occurred while creating goedkeuring for klant", {
        error,
      });
      ctx.status = 500;
      ctx.body = { error: "Internal Server Error" };
    }
  }
};
createGoedkeuringKlant.validationScheme = {
  body: {
    klantNummer: Joi.string().max(255).required(),
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
  const goedkeuringKlantRouter = new KoaRouter({
    prefix: "/goedkeuringKlant",
  });

  goedkeuringKlantRouter.get(
    "/laatsteWijziging",
    requireAuthentication,
    validate(getLaatsteWijziging.validationScheme),
    getLaatsteWijziging
  );

  goedkeuringKlantRouter.post(
    "/",
    requireAuthentication,
    validate(createGoedkeuringKlant.validationScheme),
    createGoedkeuringKlant
  );

  router
    .use(goedkeuringKlantRouter.routes())
    .use(goedkeuringKlantRouter.allowedMethods());
};
