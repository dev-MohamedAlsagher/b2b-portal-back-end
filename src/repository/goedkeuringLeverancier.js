const { getKnex, tables } = require("../data");

const getLaatsteWijziging = async (idLeverancier) => {
  const goedkeuringenLeverancier = await getKnex()(
    tables.goedkeuringleverancier
  )
    .where("idLeverancier", idLeverancier)
    .select("datumAanvraag", "afgehandeld")
    .orderBy("datumAanvraag", "desc")
    .first();
  return goedkeuringenLeverancier;
};

const createGoedkeuringLeverancier = async ({
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
  afgehandeld,
  datumAanvraag,
}) => {
  const [id] = await getKnex()(tables.goedkeuringleverancier).insert({
    idLeverancier,
    leverancierNummer,
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
  createGoedkeuringLeverancier,
};
