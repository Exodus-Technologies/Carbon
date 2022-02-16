'use strict';

require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HASH_SALT: process.env.HASH_SALT,
  sources: {
    vonage: {
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    },
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
