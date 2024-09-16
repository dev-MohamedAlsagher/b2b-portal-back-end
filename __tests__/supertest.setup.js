const supertest = require("supertest");
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

const KlantLogin = async (supertest) => {
  const response = await supertest.post("/api/klant/login").send({
    username: "Test Klant User2",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const deleteKlantLogin = async (supertest) => {
  const response = await supertest.post("/api/klant/login").send({
    username: "Test Klant User3",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const LeverancierLogin = async (supertest) => {
  const response = await supertest.post("/api/leverancier/login").send({
    username: "Test Leverancier User2",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const DeleteLeverancierLogin = async (supertest) => {
  const response = await supertest.post("/api/leverancier/login").send({
    username: "Test Leverancier User3",
    password: "12345678",
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  KlantLogin,
  withServer,
  LeverancierLogin,
  deleteKlantLogin,
  DeleteLeverancierLogin,
};
