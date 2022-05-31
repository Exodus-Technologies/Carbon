'use strict';

require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  HASH_SALT: process.env.HASH_SALT,
  PASSWORD: process.env.PASSWORD,
  defaultCacheTtl: parseInt(process.env.DEFAULT_CACHE_TTL, 10),
  sendgridKey: process.env.SENDGRID_KEY,
  requestResetPasswordCodeExpireInMinutes:
    process.env.REQUEST_RESET_PASSWORD_CODE_EXPIRE_IN_MINUTES,
  noreplyEmail: process.env.NOREPLY_EMAIL,
  sources: {
    database: {
      clusterName: process.env.CLUSTER_NAME,
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPass: process.env.DB_PASS,
      collectionName: process.env.COLLECTION_NAME,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  }
};

export default config;
