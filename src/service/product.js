const ServiceError = require("../core/serviceError");
const repoProducten = require("../repository/product");

const getProducten = async () => {
  try {
    const producten = await repoProducten.getProducten();
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductenLimit = async (begin, aantal) => {
  try {
    const producten = await repoProducten.getProductenLimit(begin, aantal);
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductenByLeverancierId = async (begin, idLeverancier, aantal) => {
  try {
    const producten = await repoProducten.getProductenByLeverancierId(
      begin,
      idLeverancier,
      aantal
    );
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductenByZoekterm = async (
  begin,
  zoekterm,
  idLeverancier,
  aantal
) => {
  if (zoekterm === undefined || zoekterm === null || zoekterm === "") {
    zoekterm = "";
  }
  try {
    const producten = await repoProducten.getProductenByZoekterm(
      begin,
      zoekterm,
      idLeverancier,
      aantal
    );
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getLeverancierProductenByZoekterm = async (
  begin,
  zoekterm,
  idLeverancier,
  aantal
) => {
  if (zoekterm === undefined || zoekterm === null || zoekterm === "") {
    zoekterm = "";
  }

  try {
    const producten = await repoProducten.getLeverancierProductenByZoekterm(
      begin,
      zoekterm,
      idLeverancier,
      aantal
    );
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductenByCategories = async (begin, categories, aantal) => {
  try {
    const producten = await repoProducten.getProductenByCategories(
      begin,
      categories,
      aantal
    );
    
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getLeverancierProductenByCategories = async (
  begin,
  categories,
  aantal
) => {
  try {
    const producten = await repoProducten.getLeverancierProductenByCategories(
      begin,
      categories,
      aantal
    );
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductByID = async (id) => {
  const product = await repoProducten.getProductById(id);

  if (!product) {
    throw ServiceError.notFound(`Geen product met id: ${id} werd gevonden`);
  }

  return product;
};

const createProducten = async (
  idLeverancier,
  foto,
  naam,
  eenheidsprijs,
  btwtarief,
  aantal,
  gewicht,
  categorie,
  beschrijving
) => {
  try {
    const createdProd = await repoProducten.createProducten(
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

    return repoProducten.getProductById(createdProd);
  } catch (error) {
    throw new Error("Error while adding product");
  }
};

const getDistinctCategories = async () => {
  try {
    const categories = await repoProducten.getDistinctCategories();
    return categories;
  } catch (error) {
    throw new Error("Error while fetching distinct categories");
  }
};

const getDistinctCategoriesLeverancier = async (idLeverancier) => {
  try {
    const categories = await repoProducten.getDistinctCategoriesLeverancier(
      idLeverancier
    );
    return categories;
  } catch (error) {
    throw new Error("Error while fetching distinct categories");
  }
};

module.exports = {
  getProducten,
  createProducten,
  getProductByID,
  getDistinctCategories,
  getProductenLimit,
  getProductenByLeverancierId,
  getProductenByZoekterm,
  getProductenByCategories,
  getLeverancierProductenByZoekterm,
  getLeverancierProductenByCategories,
  getDistinctCategoriesLeverancier,
};
