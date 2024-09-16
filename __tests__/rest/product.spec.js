const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
  LeverancierLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("product API", () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    klantAuth = await KlantLogin(request);
    leverAuth = await LeverancierLogin(request);
  });

  describe("GET /api/producten", () => {
    it("should get producten", async () => {
      const response = await request.get("/api/producten");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should get product by ID", async () => {
      const productId = 1;
      const response = await request.get(`/api/producten/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should handle invalid product ID", async () => {
      const invalidProductId = 9999;
      const response = await request.get(`/api/producten/${invalidProductId}`);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/producten", () => {
    it("should create product", async () => {
      const productData = {
        foto: "https://media.nu.nl/m/un2xpm3ag029_wd854/zwitserse-kaas.jpg",
        naam: "kaas",
        eenheidsprijs: 10,
        btwtarief: 2,
        aantal: 1,
        gewicht: 1,
        categorie: "test",
        beschrijving: "beschrijving",
      };

      const response = await request
        .post("/api/producten")
        .send(productData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should handle validation errors during creation", async () => {
      const productData = {
        naam: "kaas",
        eenheidsprijs: 10,
        btwtarief: 2,
        aantal: 1,
        gewicht: 1,
        beschrijving: "beschrijving",
      };

      const response = await request
        .post("/api/producten")
        .send(productData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(400);
    });

    it("should handle permission denied error during product creation", async () => {
      const productData = {
        foto: "https://media.nu.nl/m/un2xpm3ag029_wd854/zwitserse-kaas.jpg",
        naam: "kaas",
        eenheidsprijs: 10,
        btwtarief: 2,
        aantal: 1,
        gewicht: 1,
        categorie: "test",
        beschrijving: "beschrijving",
      };

      const response = await request
        .post("/api/producten")
        .send(productData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/producten/leverancier/:begin/:aantal", () => {
    it("should get products for the authenticated leverancier", async () => {
      const response = await request
        .get("/api/producten/leverancier/1/10")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 403 for klant", async () => {
      const response = await request
        .get("/api/producten/leverancier/1/10")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
      expect(response.body).toBeDefined();
    });

    it("should handle invalid authentication for leverancier", async () => {
      const response = await request.get("/api/producten/leverancier/0/10");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/producten/categories", () => {
    it("should get distinct categories of products", async () => {
      const response = await request.get("/api/producten/categories");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/producten/leverancier/categories", () => {
    it("should get distinct categories of products for authenticated leverancier", async () => {
      const response = await request
        .get("/api/producten/leverancier/categories")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 403 for klant", async () => {
      const response = await request
        .get("/api/producten/leverancier/categories")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
      expect(response.body).toBeDefined();
    });

    it("should handle invalid authentication for leverancier", async () => {
      const response = await request.get(
        "/api/producten/leverancier/categories"
      );

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/producten/zoekterm/:begin/:aantal/:zoekterm?", () => {
    it("should get producten by zoekterm", async () => {
      const response = await request
        .get("/api/producten/zoekterm/1/10/kaas")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/producten/zoekcategorie/:begin/:aantal/:categories", () => {
    it("should get producten by categories", async () => {
      const response = await request
        .get("/api/producten/zoekcategorie/1/10/test")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/producten/leverancier/zoekterm/:begin/:aantal/:zoekterm?", () => {
    it("should get producten by zoekterm for leverancier", async () => {
      const response = await request
        .get("/api/producten/leverancier/zoekterm/1/10/kaas")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });

    it("should return permission denied for klant", async () => {
      const response = await request
        .get("/api/producten/leverancier/zoekterm/1/10/kaas")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/producten/zoekcategorie/:begin/:aantal/:zoekterm?", () => {
    it("should get producten by zoekterm for leverancier", async () => {
      const response = await request
        .get("/api/producten/zoekcategorie/1/10/test")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });
  });
});
