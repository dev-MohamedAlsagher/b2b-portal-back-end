module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:5173'],
    maxAge: 3 * 60 * 60, 
  },

  database: {
    client: 'mysql2',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },

  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      expirationInterval: 60 * 60 * 10000, 
      issuer: 'http://localhost:9000',
      audience: 'http://localhost:5173',
    },
  },
  port: 10000,
};
