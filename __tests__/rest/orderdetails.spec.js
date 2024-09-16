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

  describe("GET /orderDetails/:id", () => {
    it("should retrieve order details for klant", async () => {
      const response = await request
        .get("/api/orderDetails/2")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve order details for leverancier", async () => {
      const response = await request
        .get("/api/orderDetails/2")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 403 Forbidden for unauthorized user", async () => {
      const response = await request.get("/api/orderDetails/1");

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it("should return 404 Not Found for non-existent order ID", async () => {
      const response = await request
        .get("/api/orderDetails/9999")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /orderDetails/order/:id", () => {
    it("should retrieve order details for klant by orderId", async () => {
      const response = await request
        .get("/api/orderDetails/order/2402141205d4e")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve order details for leverancier by orderId", async () => {
      const response = await request
        .get("/api/orderDetails/order/2402141205d4e")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 403 Forbidden for unauthorized user by orderId", async () => {
      const response = await request.get("/api/orderDetails/order/1");

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it("should return 404 Not Found for non-existent order ID by orderId", async () => {
      const response = await request
        .get("/api/orderDetails/order/9999")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });
  });
});
