'use strict';

require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  CMS: process.env.CMS_HOST,
  HASH_SALT: Number(process.env.HASH_SALT),
  PASSWORD: process.env.PASSWORD,
  jwtSecret: process.env.DB_PASS,
  defaultCacheTtl: parseInt(process.env.DEFAULT_CACHE_TTL, 10),
  sources: {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    },
    notifications: {
      noReplyEmail: process.env.NO_REPLY_EMAIL
    },
    database: {
      clusterDomain: process.env.CLUSTER_DOMAIN,
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPass: process.env.DB_PASS,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  }
};

export default config;
