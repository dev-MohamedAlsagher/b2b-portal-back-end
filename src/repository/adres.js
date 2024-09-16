const { getKnex, tables } = require("../data");

const getAdresByKlantId = async (id) => {
  const adres = await getKnex().raw(
    `select straat,nummer,stad,postcode from klant k join bedrijf b on b.idBedrijf = k.idBedrijf join adres a on a.idAdres = b.idAdres where idKlant = ${id}`
  );
  return adres[0];
};

const getAdresByLeverancierId = async (id) => {
  const adres = await getKnex().raw(
    `select straat,nummer,stad,postcode from leverancier k join bedrijf b on b.idBedrijf = k.idBedrijf join adres a on a.idAdres = b.idAdres where idLeverancier = ${id}`
  );
  return adres[0];
};

const getAdresById = async (id) => {
  const adres = await getKnex()(tables.adres).where("idAdres", id).first();

  return adres;
};

const createAdres = async ({ straat, nummer, stad, postcode }) => {
  const createdAt = new Date();
  const [id] = await getKnex()(tables.adres).insert({
    straat,
    nummer,
    stad,
    postcode,
    laatstGebruikt: createdAt,
  });

  return id;
};

const updateAdresById = async (id, { straat, nummer, stad, postcode }) => {
  const createdAt = new Date();
  await getKnex()(tables.adres).where(`${tables.adres}.idAdres`, id).update({
    straat: straat,
    nummer: nummer,
    stad: stad,
    postcode: postcode,
    laatstGebruikt: createdAt,
  });
  return id;
};

module.exports = {
  getAdresById,
  createAdres,
  updateAdresById,
  getAdresByKlantId,
  getAdresByLeverancierId,
};
