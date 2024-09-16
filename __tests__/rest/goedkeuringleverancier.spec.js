const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
  LeverancierLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("/goedkeuringLeverancier/", () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    klantAuth = await KlantLogin(request);
    leverAuth = await LeverancierLogin(request);
  });

  describe("GET /goedkeuringLeverancier/laatsteWijziging", () => {
    it("should fetch the latest modification", async () => {
      const response = await request
        .get("/api/goedkeuringLeverancier/laatsteWijziging")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });

    it("should return 403 Permission denied", async () => {
      const response = await request
        .get("/api/goedkeuringLeverancier/laatsteWijziging")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("POST /goedkeuringLeverancier", () => {
    it("should create a goedkeuring request for a klant", async () => {
      const response = await request
        .post("/api/goedkeuringLeverancier")
        .send({
          leverancierNummer: "123456789",
          gebruikersnaam: "john_doe",
          email: "john.doe@example.com",
          isActief: true,
          roles: ["klant", "admin"],
          iban: "NL91ABNA0417164300",
          btwNummer: "NL123456789B01",
          telefoonnummer: "+1234567890",
          sector: "IT",
          straat: "Main Street",
          nummer: "123",
          stad: "City",
          postcode: "12345",
        })
        .set("Authorization", leverAuth);

      expect(response.status).toBe(201);
    });

    it("should return 403 PERMISSION DENIED", async () => {
      const response = await request
        .post("/api/goedkeuringLeverancier")
        .send({
          leverancierNummer: "123456789",
          gebruikersnaam: "john_doe",
          email: "john.doe@example.com",
          isActief: true,
          roles: ["klant", "admin"],
          iban: "NL91ABNA0417164300",
          btwNummer: "NL123456789B01",
          telefoonnummer: "+1234567890",
          sector: "IT",
          straat: "Main Street",
          nummer: "123",
          stad: "City",
          postcode: "12345",
        })
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });
  });
});
