const { tables, getKnex } = require("../data/index");

const SELECT_COLUMNS = [
  `${tables.product}.idProduct`,
  "idLeverancier",
  "naam",
  "eenheidsprijs",
  "btwtarief",
  "foto",
  "aantal",
  "gewicht",
  "beschrijving",
  "categorie",
];

const getProducten = async () => {
  const producten = getKnex()(tables.product).select(...SELECT_COLUMNS);

  return producten;
};

const getProductenLimit = async (begin, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;

  const producten = getKnex()(tables.product)
    .select(...SELECT_COLUMNS)
    .limit(pageSize)
    .offset(offset);

  return producten;
};

const getProductenByLeverancierId = async (begin, idLeverancier, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;

  const producten = getKnex()(tables.product)
    .select(...SELECT_COLUMNS)
    .where("idLeverancier", idLeverancier)
    .limit(pageSize)
    .offset(offset);

  return producten;
};

const getProductenByZoekterm = async (begin, zoekterm, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;

  const producten = getKnex()(tables.product)
    .select(...SELECT_COLUMNS)
    .where("naam", "like", `%${zoekterm}%`)
    .limit(pageSize)
    .offset(offset);

  return producten;
};

const getLeverancierProductenByZoekterm = async (
  begin,
  zoekterm,
  idLeverancier,
  aantal
) => {
  const pageSize = aantal;
  const offset = begin - 1;

  const producten = getKnex()(tables.product)
    .select(...SELECT_COLUMNS)
    .where("naam", "like", `%${zoekterm}%`)
    .where("idLeverancier", idLeverancier)
    .limit(pageSize)
    .offset(offset);

  return producten;
};

const getProductenByCategories = async (begin, categories, aantal) => {
  const pageSize = aantal;
  const offset = begin - 1;

  const producten = await getKnex()(tables.product)
    .select(...SELECT_COLUMNS)
    .whereIn("categorie", categories)
    .limit(pageSize)
    .offset(offset);

  return producten;
};

const getProductById = async (id) => {
  id = Number(id);

  const product = await getKnex()(tables.product)
    .where("idProduct", id)
    .first(...SELECT_COLUMNS);

  return product;
};

const getDistinctCategories = async () => {
  const categories = await getKnex()("product").distinct("categorie");

  return categories.map((categoryObj) => categoryObj.categorie);
};

const getDistinctCategoriesLeverancier = async (idLeverancier) => {
  const categories = await getKnex()("product")
    .distinct("categorie")
    .where("idLeverancier", idLeverancier);

  return categories.map((categoryObj) => categoryObj.categorie);
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
  const product = {
    idLeverancier,
    foto,
    naam,
    eenheidsprijs,
    btwtarief,
    aantal,
    gewicht,
    categorie,
    beschrijving,
  };

  const [idProduct] = await getKnex()(tables.product).insert(product);

  return idProduct;
};

module.exports = {
  getProducten,
  createProducten,
  getProductById,
  getDistinctCategories,
  getProductenLimit,
  getProductenByLeverancierId,
  getProductenByZoekterm,
  getProductenByCategories,
  getLeverancierProductenByZoekterm,
  getDistinctCategoriesLeverancier,
};
