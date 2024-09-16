module.exports = {
  log: {
    level: 'info',
    disabled: false,
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
      issuer: 'backend',
      audience: 'frontend',
    },
  },
};
