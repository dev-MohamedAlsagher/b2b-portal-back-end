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

  describe("GET /api/order/", () => {
    it("should retrieve klant orders", async () => {
      const response = await request
        .get(`/api/order/klant/1/5`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve leverancier orders", async () => {
      const response = await request
        .get("/api/order/leverancier/1/5")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve klant order by ID", async () => {
      const orderId = "2402141205d4e";
      const response = await request
        .get(`/api/order/${orderId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should deny invalid order ID for klant", async () => {
      const noAccesOrderId = "2402011150a1b";
      const response = await request
        .get(`/api/order/${noAccesOrderId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(403);
    });

    it("should retrieve leverancier order by ID", async () => {
      const orderId = "2402141205d4e";
      const response = await request
        .get(`/api/order/${orderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should deny invalid order ID for leverancier", async () => {
      const noAccesOrderId = "2402011150a1b";
      const response = await request
        .get(`/api/order/${noAccesOrderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("POST /api/order", () => {
    it("should create order", async () => {
      const orderData = {
        idLeverancier: 2,
        datum: "2024-03-07",
        orderStatus: "Pending",
        betalingStatus: "Paid",
        totaalPrijs: 100.0,
        adres: {
          straat: "Main Street",
          stad: "Cityville",
          nummer: "123",
          postcode: "12345",
        },
        products: [
          {
            eenheidsprijs: 10.0,
            aantal: 2,
            idProduct: 1,
          },
          {
            eenheidsprijs: 15.0,
            aantal: 4,
            idProduct: 2,
          },
        ],
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it("should handle validation errors during creation", async () => {
      const orderData = {
        idLeverancier: 2,
        datum: "2024-03-07",
        orderStatus: "Pending",
        betalingStatus: "Paid",
        totaalPrijs: 100.0,
        products: [
          {
            eenheidsprijs: 10.0,
            aantal: 2,
            idProduct: 1,
          },
          {
            eenheidsprijs: 15.0,
            aantal: 4,
            idProduct: 2,
          },
        ],
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(400);
    });

    it("should handle denied permission for leverancier", async () => {
      const orderData = {
        idLeverancier: 2,
        datum: "2024-03-07",
        orderStatus: "Pending",
        betalingStatus: "Paid",
        totaalPrijs: 100.0,
        adres: {
          straat: "Main Street",
          stad: "Cityville",
          nummer: "123",
          postcode: "12345",
        },
        products: [
          {
            eenheidsprijs: 10.0,
            aantal: 2,
            idProduct: 1,
          },
          {
            eenheidsprijs: 15.0,
            aantal: 4,
            idProduct: 2,
          },
        ],
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(403);
    });
  });

  describe("PUT /api/order/:id", () => {
    it("should update order for leverancier", async () => {
      const orderId = "2402141205d4e";
      const updatedOrderData = {
        orderStatus: "completed",
        betalingStatus: "paid",
      };

      const response = await request
        .put(`/api/order/${orderId}`)
        .send(updatedOrderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should update order for klant", async () => {
      const orderId = "2402141205d4e";
      const updatedOrderData = {
        betalingStatus: "paid",
      };

      const response = await request
        .put(`/api/order/${orderId}`)
        .send(updatedOrderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should not update order for klant", async () => {
      const orderId = 2;
      const updatedOrderData = {
        orderStatus: "complete",
      };

      const response = await request
        .put(`/api/order/${orderId}`)
        .send(updatedOrderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
    });

    it("should handle invalid order ID during update", async () => {
      const invalidOrderId = 9999;
      const updatedOrderData = {
        orderStatus: "completed",
      };

      const response = await request
        .put(`/api/order/${invalidOrderId}`)
        .send(updatedOrderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(404);
    });
  });
});
