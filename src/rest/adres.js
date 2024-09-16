const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const adresService = require("../service/adres");
const validate = require("../core/validation");
const Role = require("../core/roles");
const { getLogger } = require("../core/logging");
const usersService = require("../service/users");
const orderService = require("../service/order");

const getAdresByUser = async (ctx) => {
  try {
    let adres;
    const { idKlant, idLeverancier } = ctx.state.session;
    if (idKlant !== undefined) {
      adres = await adresService.getAdresByKlantId(idKlant);
    }
    if (idLeverancier !== undefined) {
      adres = await adresService.getAdresByLeverancierId(idLeverancier);
    }
    ctx.body = adres;
    ctx.status = 200;

    getLogger().info("Addresses fetched successfully", { adres });
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };

    getLogger().error("Error occurred while fetching addresses", { error });
  }
};
getAdresByUser.validationScheme = {};

const getAdresById = async (ctx) => {
  try {
    let order;
    let user;
    let adres;
    const { idKlant, idLeverancier } = ctx.state.session;
    const id = ctx.params.id;

    try {
      adres = await adresService.getAdresById(id);
    } catch (error) {
      ctx.body = { message: "Address not found" };
      ctx.status = 404;
      return;
    }

    if (idKlant !== undefined) {
      order = await orderService.getOrderByKlantId(idKlant);
      user = await usersService.getKlantById(idKlant);
    } else {
      order = await orderService.getOrderByLeverancierId(idLeverancier);
      user = await usersService.getLeverancierById(idLeverancier);
    }

    if (!user) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    let hasCorrectAddress = false;

    for (const ord of order) {
      if (ord.idAdres === adres.idAdres) {
        hasCorrectAddress = true;
        break;
      }
    }

    if (!hasCorrectAddress) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    ctx.body = adres;
    ctx.status = 200;
    getLogger().info(`Address with ID ${id} fetched successfully`);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    getLogger().error("Error occurred while fetching address by ID", { error });
  }
};

getAdresById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createAdres = async (ctx) => {
  try {
    const { straat, nummer, stad, postcode, laatstGebruikt } = ctx.request.body;

    const newAdres = await adresService.createAdres({
      straat: String(straat),
      nummer: String(nummer),
      stad: String(stad),
      postcode: String(postcode),
    });

    ctx.body = newAdres;
    ctx.status = 201;
    getLogger().info("New address created successfully", { newAdres });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    getLogger().error("Error occurred while creating address", { error });
  }
};
createAdres.validationScheme = {
  body: {
    straat: Joi.string().required().invalid(" ", ""),
    nummer: Joi.string().required().invalid(" ", ""),
    stad: Joi.string().required().invalid(" ", ""),
    postcode: Joi.string().required().invalid(" ", ""),
  },
};

/**
 * Install adres routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const adresRouter = new KoaRouter({
    prefix: "/adres",
  });

  adresRouter.get(
    "/user",
    requireAuthentication,
    validate(getAdresByUser.validationScheme),
    getAdresByUser
  );

  adresRouter.post(
    "/",
    requireAuthentication,
    validate(createAdres.validationScheme),
    createAdres
  );
  adresRouter.get(
    "/:id",
    requireAuthentication,
    validate(getAdresById.validationScheme),
    getAdresById
  );

  router.use(adresRouter.routes()).use(adresRouter.allowedMethods());
};
