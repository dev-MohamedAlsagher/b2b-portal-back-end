const { tables } = require("../../src/data");
const {
  withServer,
  LeverancierLogin,
  DeleteLeverancierLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");
const { deleteLeverancier } = require("../../src/service/users");

describe("Users API", () => {
  let request, knex, leverAuth, leverAuth2;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
    leverAuth2 = await DeleteLeverancierLogin(request);
  });

  describe("POST /api/leverancier/login", () => {
    it("should login and return a token", async () => {
      const response = await request.post("/api/leverancier/login").send({
        username: "test_leverancier1",
        password: "12345678",
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 401 for invalid login credentials", async () => {
      const response = await request.post("/api/leverancier/login").send({
        username: "Test Leverancier User",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });

  describe("Get /api/leverancier", () => {
    it("should get current leverancier", async () => {
      const response = await request
        .get("/api/leverancier")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });
    it("should give unathorized error", async () => {
      const response = await request.get("/api/leverancier");

      expect(response.body.code).toBe("UNAUTHORIZED");
    });
  });
  describe("PUT /api/leverancier", () => {
    it("should update leverancier", async () => {
      const response = await request
        .put("/api/leverancier")
        .send({
          username: "UpdatedUser",
          password: "newPassword",
        })
        .set("Authorization", leverAuth2);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 400 for invalid update data", async () => {
      const response = await request
        .put("/api/leverancier")
        .send({
          invalidField: "InvalidValue",
        })
        .set("Authorization", leverAuth);

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /api/leverancier", () => {
    it("should delete the authenticated leverancier", async () => {
      const response = await request
        .delete("/api/leverancier")
        .set("Authorization", leverAuth2);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});
