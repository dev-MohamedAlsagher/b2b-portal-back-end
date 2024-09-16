const KoaRouter = require("@koa/router");
const Joi = require("joi");
const validate = require("../core/validation");
const ServiceProducten = require("../service/product");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const getProducten = async (ctx) => {
  try {
    const producten = await ServiceProducten.getProducten();

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten",
    };
    ctx.status = 500;
  }
};

const getProductenLimit = async (ctx) => {
  const { begin } = ctx.params;
  const { aantal } = ctx.params;

  try {
    const producten = await ServiceProducten.getProductenLimit(begin, aantal);

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

getProductenLimit.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    aantal: Joi.number().positive(),
  },
};

const getProductenByLeverancierId = async (ctx) => {
  const { begin } = ctx.params;
  const { aantal } = ctx.params;
  const { idLeverancier } = ctx.state.session;
  try {
    const producten = await ServiceProducten.getProductenByLeverancierId(
      begin,
      idLeverancier,
      aantal
    );

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

const getProductenByZoekterm = async (ctx) => {
  const { begin } = ctx.params;
  const { aantal } = ctx.params;
  const { zoekterm } = ctx.params;
  try {
    const producten = await ServiceProducten.getProductenByZoekterm(
      begin,
      zoekterm,
      aantal
    );

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

getProductenByZoekterm.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    aantal: Joi.number().positive(),
    zoekterm: Joi.string().optional().allow(""),
  },
};

const getLeverancierProductenByZoekterm = async (ctx) => {
  const { idLeverancier } = ctx.state.session;
  const { begin } = ctx.params;
  const { zoekterm } = ctx.params;
  const { aantal } = ctx.params;

  try {
    const producten = await ServiceProducten.getLeverancierProductenByZoekterm(
      begin,
      zoekterm,
      idLeverancier,
      aantal
    );

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

getLeverancierProductenByZoekterm.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    zoekterm: Joi.string().optional(),
    aantal: Joi.number().positive().allow(""),
  },
};

const getProductenByCategories = async (ctx) => {
  const { begin } = ctx.params;
  const categories = ctx.params.categories.split(",");
  const { aantal } = ctx.params;
  let producten;
  try {
    producten = await ServiceProducten.getProductenByCategories(
      begin,
      categories,
      aantal
    );

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

getProductenByCategories.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    categories: Joi.string().required(),
    aantal: Joi.number().positive(),
  },
};

const getProductenleverancierByCategories = async (ctx) => {
  const { begin } = ctx.params;
  const categories = ctx.params.categories.split(",");
  const { aantal } = ctx.params;
  let producten;
  try {
    producten = await ServiceProducten.getProductenByCategories(
      begin,
      categories,
      aantal
    );

    if (ctx.state.session.roles.includes("leverancier")) {
      const idLeverancier = ctx.state.session.idLeverancier;
      producten = producten.filter(
        (product) => product.idLeverancier === idLeverancier
      );
      ctx.body = producten;
      ctx.status = 200;
      return;
    }
    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    ctx.status = 500;
  }
};

getProductenleverancierByCategories.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    categories: Joi.string().required(),
    aantal: Joi.number().positive(),
  },
};

getProductenByLeverancierId.validationScheme = {
  params: {
    begin: Joi.number().positive(),
    aantal: Joi.number().positive(),
  },
};

const getProductByID = async (ctx) => {
  ctx.body = await ServiceProducten.getProductByID(Number(ctx.params.id));
};

getProducten.validationScheme = {};

const createProducten = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;

    const {
      foto,
      naam,
      eenheidsprijs,
      btwtarief,
      aantal,
      gewicht,
      categorie,
      beschrijving,
    } = ctx.request.body;

    const createdProd = await ServiceProducten.createProducten(
      idLeverancier,
      foto,
      naam,
      eenheidsprijs,
      btwtarief,
      aantal,
      gewicht,
      categorie,
      beschrijving
    );

    ctx.body = createdProd;
    ctx.status = 200;
  } catch (error) {
    if (ctx.status === 403) {
      ctx.body = {
        message: "Permission denied",
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: error,
      };
    }
  }
};
createProducten.validationScheme = {
  body: {
    foto: Joi.string().required(),
    naam: Joi.string().required(),
    eenheidsprijs: Joi.number().positive().required(),
    btwtarief: Joi.number().positive().required(),
    aantal: Joi.number().integer().required(),
    gewicht: Joi.number().precision(2).positive().required(),
    categorie: Joi.string().required(),
    beschrijving: Joi.string().max(255),
  },
};

const getDistinctCategories = async (ctx) => {
  try {
    const categories = await ServiceProducten.getDistinctCategories();
    ctx.body = categories;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Error fetching categories",
    };
  }
};

const getLeverancierProductenByCategories = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const categories = await ServiceProducten.getDistinctCategoriesLeverancier(
      idLeverancier
    );
    ctx.body = categories;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Error fetching categories",
    };
  }
};

const requireLeverancier = makeRequireRole(Role.LEVER);

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const ProductRouter = new KoaRouter({
    prefix: "/producten",
  });
  // public
  ProductRouter.get("/", validate(getProducten.validationScheme), getProducten);
  ProductRouter.get("/categories", getDistinctCategories);
  ProductRouter.get("/:id", getProductByID);
  ProductRouter.get(
    "/begin/:begin/:aantal",
    validate(getProductenLimit.validationScheme),
    getProductenLimit
  );
  ProductRouter.get(
    "/zoekterm/:begin/:aantal/:zoekterm?",
    validate(getProductenByZoekterm.validationScheme),
    getProductenByZoekterm
  );

  ProductRouter.get(
    "/zoekcategorie/:begin/:aantal/:categories",
    validate(getProductenByCategories.validationScheme),
    getProductenByCategories
  );

  //private

  ProductRouter.get(
    "/leverancier/zoekcategorie/:begin/:aantal/:categories",
    requireAuthentication,
    validate(getProductenleverancierByCategories.validationScheme),
    getProductenleverancierByCategories
  );

  ProductRouter.get(
    "/leverancier/zoekterm/:begin/:aantal/:zoekterm?",
    requireAuthentication,
    requireLeverancier,
    validate(getLeverancierProductenByZoekterm.validationScheme),
    getLeverancierProductenByZoekterm
  );
  ProductRouter.get(
    "/leverancier/categories",
    requireAuthentication,
    requireLeverancier,
    validate(getLeverancierProductenByCategories.validationScheme),
    getLeverancierProductenByCategories
  );

  ProductRouter.post(
    "/",
    requireAuthentication,
    requireLeverancier,
    validate(createProducten.validationScheme),
    createProducten
  );

  //hier
  ProductRouter.get(
    "/leverancier/:begin/:aantal",
    requireAuthentication,
    requireLeverancier,
    validate(getProductenByLeverancierId.validationScheme),
    getProductenByLeverancierId
  );

  router.use(ProductRouter.routes()).use(router.allowedMethods());
};
