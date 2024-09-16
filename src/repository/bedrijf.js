const { getKnex, tables } = require("../data");

const deactivateBedrijf = async (id) => {
  await getKnex()(tables.bedrijf)
    .where("idBedrijf", id)
    .update("isActief", false);

  const bedrijf = await getKnex()(tables.bedrijf).where("idBedrijf", id);

  return bedrijf;
};

const createBedrijf = async ({
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
}) => {
  const [id] = await getKnex()(tables.bedrijf).insert({
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
  return id;
};

const getBedrijfById = async (id) => {
  const bedrijf = await getKnex()(tables.bedrijf)
    .select("*")
    .leftJoin(
      `${tables.adres}`,
      `${tables.bedrijf}.idAdres`,
      `${tables.adres}.idAdres`
    )
    .where(`${tables.bedrijf}.idBedrijf`, id)
    .first();

  return formatBedrijf(bedrijf);
};

const findBedrijfByName = (naam) => {
  return getKnex()(tables.bedrijf).where("naam", naam).first();
};

const formatBedrijf = (result) => {
  const formattedResult = {
    idBedrijf: result.idBedrijf,
    naam: result.naam,
    logo: result.logo,
    sector: result.sector,
    iban: result.iban,
    btwNummer: result.btwNummer,
    email: result.email,
    telefoonnummer: result.telefoonnummer,
    gebruikerSinds: result.gebruikerSinds,
    Adres: {
      idAdres: result.idAdres,
      straat: result.straat,
      nummer: result.nummer,
      stad: result.stad,
      postcode: result.postcode,
      laatstGebruikt: result.laatstGebruikt,
    },
  };

  if (result.idKlant) {
    formattedResult.Klant = {
      idKlant: result.idKlant,
      klantNummer: result.klantNummer,
      gebruikersnaam: result.gebruikersnaam,
      email: result.email,
      isActief: result.isActief,
      roles: result.roles,
    };
  }

  if (result.idLeverancier) {
    formattedResult.Leverancier = {
      idLeverancier: result.idLeverancier,
      leverancierNummer: result.leverancierNummer,
      gebruikersnaam: result.gebruikersnaam,
      email: result.email,
      isActief: result.isActief,
      roles: result.roles,
    };
  }

  return formattedResult;
};

module.exports = {
  deactivateBedrijf,
  createBedrijf,
  getBedrijfById,
  findBedrijfByName,
};
