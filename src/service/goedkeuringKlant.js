const goedkeuringKlantRepo = require("../repository/goedkeuringKlant");
const ServiceError = require("../core/serviceError");

const checkAdminOrKlantRole = (role) => {
  if (!role || (!role.includes("admin") && !role.includes("klant"))) {
    return false;
  }
  return true;
};


const checkOnlyKlantRole = (role) => {
  if (!role || !role.includes("klant")) {
    return false;
  }

  return true;
};

const checkKlantId = (idKlant, id) => {
  if (idKlant !== id) {
    return false;
  }
  return true;
};

const getLaatsteWijziging = async (session) => {
  try {
    if (!checkAdminOrKlantRole(session.roles)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    const laatsteWijziging = await goedkeuringKlantRepo.getLaatsteWijziging(
      session.idKlant
    );
    if (!laatsteWijziging) {
      return { message: "No change request has been made yet" };
    }
    return laatsteWijziging;
  } catch (error) {
    throw error;
  }
};

const createGoedkeuringKlant = async (
  {
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
  },
  session
) => {
  try {
    if (!checkOnlyKlantRole(session.roles)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    if (!checkKlantId(idKlant, session.idKlant)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    const idNewGoedkeuringWijziging =
      await goedkeuringKlantRepo.createGoedkeuringKlant({
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
        afgehandeld: "in behandeling",
        datumAanvraag: new Date(),
      });

    return idNewGoedkeuringWijziging;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLaatsteWijziging,
  createGoedkeuringKlant,
};
