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

  describe("/api/notificatie/", () => {
    describe("GET /api/notificatie/", () => {
      it("should retrieve notification by ID", async () => {
        const id = 2;
        const response = await request
          .get(`/api/notificatie/${id}`)
          .set("Authorization", klantAuth);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      });

      it("should return 404 Not Found if notification does not exist", async () => {
        const id = 9999;
        const response = await request
          .get(`/api/notificatie/${id}`)
          .set("Authorization", klantAuth);

        expect(response.status).toBe(404);
      });

      it("should return 403 Permission Denied if user does not have access", async () => {
        const id = 1;
        const response = await request
          .get(`/api/notificatie/${id}`)
          .set("Authorization", klantAuth);

        expect(response.status).toBe(403);
      });
    });
  });

  describe("GET /notificatie/klant/:begin/:aantal", () => {
    it("should retrieve notifications for a Klant by ID", async () => {
      const begin = 1;
      const aantal = 10;
      const response = await request
        .get(`/api/notificatie/klant/${begin}/${aantal}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
    });
  });

  describe("GET /notificatie/leverancier/:begin/:aantal", () => {
    it("should retrieve notifications for a Leverancier by ID", async () => {
      const begin = 1;
      const aantal = 10;
      const response = await request
        .get(`/api/notificatie/leverancier/${begin}/${aantal}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });
  });

  describe("GET /notificatie/ongeopend/klant/:id", () => {
    it("should retrieve the count of unopened notifications for a Klant by ID", async () => {
      const klantId = 2;
      const response = await request
        .get(`/api/notificatie/ongeopend/klant/${klantId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
    });

    it("should return status 403 Permission denied", async () => {
      const klantId = 1;
      const response = await request
        .get(`/api/notificatie/ongeopend/klant/${klantId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /notificatie/ongeopend/leverancier/:id", () => {
    it("should retrieve the count of unopened notifications for a Leverancier by ID", async () => {
      const leverancierId = 2;
      const response = await request
        .get(`/api/notificatie/ongeopend/leverancier/${leverancierId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });

    it("should return status 403 Permission denied", async () => {
      const leverancierId = 3;
      const response = await request
        .get(`/api/notificatie/ongeopend/leverancier/${leverancierId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("PUT /notificatie/:id", () => {
    it("should update a notification by ID", async () => {
      const notificationId = 2;
      const requestBody = {
        idOrder: "2402141205d4e",
        text: "Updated notification text",
        onderwerp: "Updated subject",
        geopend: true,
        afgehandeld: false,
        datum: new Date(),
      };

      const response = await request
        .put(`/api/notificatie/${notificationId}`)
        .set("Authorization", klantAuth)
        .send(requestBody);

      expect(response.status).toBe(200);
    });

    it("should return 403 Permission denied", async () => {
      const notificationId = 1;
      const requestBody = {
        idOrder: "2402241211g7h",
        text: "Updated notification text",
        onderwerp: "Updated subject",
        geopend: true,
        afgehandeld: false,
        datum: new Date(),
      };

      const response = await request
        .put(`/api/notificatie/${notificationId}`)
        .set("Authorization", klantAuth)
        .send(requestBody);

      expect(response.status).toBe(403);
    });
  });
});
