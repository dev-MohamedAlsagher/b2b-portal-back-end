const bedrijfsRepo = require("../repository/bedrijf");

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
}) => {
  //check if naam is unique by using findBedrijfByName() and show error if not
  const existingBedrijf = await bedrijfsRepo.findBedrijfByName(naam);
  if (existingBedrijf) {
    throw new Error("Bedrijf with this naam already exists");
  }
  const idBedrijf = await bedrijfsRepo.createBedrijf({
    naam,
    logo,
    sector,
    iban,
    btwNummer,
    email,
    telefoonnummer,
    gebruikerSinds,
    idAdres,
  });
  return await bedrijfsRepo.getBedrijfById(idBedrijf);
};

module.exports = {
  createBedrijf,
}