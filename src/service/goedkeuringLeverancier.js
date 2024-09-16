const goedkeuringLeverancierRepo = require("../repository/goedkeuringLeverancier");
const ServiceError = require("../core/serviceError");

const checkAdminOrLeverancierRole = (role) => {
  if (!role || (!role.includes("admin") && !role.includes("leverancier"))) {
    return false;
  }
  return true;
};

const checkOnlyLeverancierRole = (role) => {
  if (!role || !role.includes("leverancier")) {
    return false;
  }
  return true;
};

const checkLeverancierId = (idLeverancier, id) => {
  if (idLeverancier !== id) {
    return false;
  }
  return true;
};

const getLaatsteWijziging = async (session) => {
  try {
    if (!checkAdminOrLeverancierRole(session.roles)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    const laatsteWijziging =
      await goedkeuringLeverancierRepo.getLaatsteWijziging(
        session.idLeverancier
      );
    if (!laatsteWijziging) {
      return { message: "No change request has been made yet" };
    }
    return laatsteWijziging;
  } catch (error) {
    throw error;
  }
};

const createGoedkeuringLeverancier = async (
  {
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
  },
  session
) => {
  try {
    if (!checkOnlyLeverancierRole(session.roles)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    if (!checkLeverancierId(idLeverancier, session.idLeverancier)) {
      throw ServiceError.unauthorized("Permission denied");
    }
    const idNewGoedkeuringWijziging =
      await goedkeuringLeverancierRepo.createGoedkeuringLeverancier({
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
  createGoedkeuringLeverancier,
};
