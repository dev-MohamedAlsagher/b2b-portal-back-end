const { getKnex, tables } = require("../data");

const getLaatsteWijziging = async (idKlant) => {
  const goedkeuringenKlant = await getKnex()(tables.goedkeuringklant)
    .where("idKlant", idKlant)
    .select("datumAanvraag", "afgehandeld")
    .orderBy("datumAanvraag", "desc")
    .first();
  return goedkeuringenKlant;
};

const createGoedkeuringKlant = async ({
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
  afgehandeld,
  datumAanvraag,
}) => {
  const [id] = await getKnex()(tables.goedkeuringklant).insert({
    idKlant,
    klantNummer,
    gebruikersnaam,
    email,
    isActief,
    roles: JSON.stringify(roles),
    iban,
    btwNummer,
    telefoonnummer,
    sector,
    straat,
    nummer,
    stad,
    postcode,
    afgehandeld,
    datumAanvraag,
  });
  return id;
};

module.exports = {
  getLaatsteWijziging,
  createGoedkeuringKlant,
};
