const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
  LeverancierLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("order API", () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
    klantAuth = await KlantLogin(request);
  });

  describe("GET /api/adres/", () => {
    it("should retrieve adres for klant", async () => {
      const response = await request
        .get(`/api/adres/user/`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve adres for leverancier", async () => {
      const response = await request
        .get(`/api/adres/user/`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should fail to retrieve adres", async () => {
      const response = await request.get(`/api/adres/user/`);

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/adres/:id", () => {
    it("should retrieve adres by ID for klant", async () => {
      const id = 2;
      const response = await request
        .get(`/api/adres/${id}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve adres by ID for leverancier", async () => {
      const id = 2;
      const response = await request
        .get(`/api/adres/${id}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 404 Not Found if adres does not exist", async () => {
      const id = 9999;
      const response = await request
        .get(`/api/adres/${id}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
    });

    it("should return 403 Permission Denied if klant does not have access", async () => {
      const id = 1;
      const response = await request
        .get(`/api/adres/${id}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });

    it("should return 403 Permission Denied if leverancier does not have access", async () => {
      const id = 1;
      const response = await request
        .get(`/api/adres/${id}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("POST /api/adres/", () => {
    it("should create a new adres for klant", async () => {
      const newAdresData = {
        straat: "Example Street",
        nummer: "123",
        stad: "Example City",
        postcode: "12345",
      };

      const response = await request
        .post(`/api/adres/`)
        .set("Authorization", klantAuth)
        .send(newAdresData);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it("should create a new adres for leverancier", async () => {
      const newAdresData = {
        straat: "Example Street",
        nummer: "123",
        stad: "Example City",
        postcode: "12345",
      };

      const response = await request
        .post(`/api/adres/`)
        .set("Authorization", leverAuth)
        .send(newAdresData);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });
  });
});
