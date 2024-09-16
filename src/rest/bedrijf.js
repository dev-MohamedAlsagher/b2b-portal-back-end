const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const bedrijfRepo = require("../repository/bedrijf");
const validate = require("../core/validation");
const Role = require("../core/roles");
const { getLogger } = require("../core/logging");
const bedrijfServer = require("../service/bedrijf");

const deactivateBedrijf = async (ctx) => {
  try {
    const { idBedrijf } = ctx.request.body;
    const bedrijf = await bedrijfRepo.deactivateBedrijf(idBedrijf);
    ctx.status = 200;
    ctx.body = bedrijf;
  } catch (error) {
    (ctx.body = "error while deactivating bedrijf "), error;
  }
};

deactivateBedrijf.validationScheme = {
  body: {
    idBedrijf: Joi.number().integer().required(),
  },
};

const createBedrijf = async (ctx) => {
  try {
    const {
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      email,
      telefoonnummer,
      gebruikerSinds,
      idAdres,
      isActief = true,
    } = ctx.request.body;

    const newBedrijf = await bedrijfServer.createBedrijf({
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      email,
      telefoonnummer,
      gebruikerSinds,
      idAdres,
      isActief,
    });
    ctx.body = newBedrijf;
    ctx.status = 201;
    getLogger().info("New bedrijf created successfully", { newBedrijf });
  } catch (error) {
    getLogger().error("Error occurred while creating bedrijf", { error });
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
createBedrijf.validationSheme = {
  body: {
    naam: Joi.string().required().invalid(" ", ""),
    logo: Joi.string().required().invalid(" ", ""),
    sector: Joi.string().required().invalid(" ", ""),
    iban: Joi.string().required().invalid(" ", ""),
    btwNummer: Joi.string().required().invalid(" ", ""),
    email: Joi.string().required().invalid(" ", ""),
    telefoonnummer: Joi.string().required().invalid(" ", ""),
    gebruikerSinds: Joi.string().required().invalid(" ", ""),
    idAdres: Joi.number().integer().positive(),
  },
};

const requireAdmin = makeRequireRole(Role.ADMIN);

/**
 * Install adres routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const bedrijfRouter = new KoaRouter({
    prefix: "/bedrijf",
  });

  bedrijfRouter.post(
    "/deactivate",
    requireAuthentication,
    requireAdmin,
    validate(deactivateBedrijf.validationScheme),
    deactivateBedrijf
  );

  bedrijfRouter.post(
    "/",
    requireAuthentication,
    requireAdmin,
    validate(createBedrijf.validationSheme),
    createBedrijf
  );

  router.use(bedrijfRouter.routes()).use(bedrijfRouter.allowedMethods());
};
