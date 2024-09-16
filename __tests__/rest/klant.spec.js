const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
  deleteKlantLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("Users API", () => {
  let request, knex, klantAuth, leverAuth, klantAuth2;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    klantAuth = await KlantLogin(request);
    klantAuth2 = await deleteKlantLogin(request);
  });

  describe("POST /api/klant/login", () => {
    it("should login and return a token", async () => {
      const response = await request.post("/api/klant/login").send({
        username: "tester_klant1",
        password: "12345678",
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 401 for invalid login credentials", async () => {
      const response = await request.post("/api/klant/login").send({
        username: "Test Klant User",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });

  describe("Get /api/klant", () => {
    it("should get current klant", async () => {
      const response = await request
        .get("/api/klant")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
    });
    it("should give unathorized error", async () => {
      const response = await request.get("/api/klant");

      expect(response.body.code).toBe("UNAUTHORIZED");
    });
  });
  describe("PUT /api/klant", () => {
    it("should update klant", async () => {
      const response = await request
        .put("/api/klant")
        .send({
          username: "UpdatedUser",
          password: "newPassword",
        })
        .set("Authorization", klantAuth2);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 400 for invalid update data", async () => {
      const response = await request
        .put("/api/klant")
        .send({
          invalidField: "InvalidValue",
        })
        .set("Authorization", klantAuth);

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /api/klant", () => {
    it("should delete the authenticated user", async () => {
      const response = await request
        .delete("/api/klant")
        .set("Authorization", klantAuth2);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Klant deleted");
    });
  });
});
