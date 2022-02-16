'use strict';

import bcrypt from 'bcrypt';
import { validationResult } from '../validations';
import config from '../config';

const requestResponse = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    console.info(
      `${res.statusCode} ${res.statusMessage}; ${res.get('X-Response-Time')} ${
        res.get('Content-Length') || 0
      }b sent`
    );
  });
  next();
};

const errorHandler = (err, req, res, next) => {
  err && console.error('Error: ', err);
  res.status(err.status || 500).send(err.message);
};

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const generateDBUri = () => {
  const { dbUser, dbPass, clusterName, dbName } = config.sources.database;
  return `mongodb+srv://${dbUser}:${dbPass}@${clusterName}.ybdno.mongodb.net/${dbName}?retryWrites=true&w=majority`;
};

//Create method to compare a given password with the database hash
const comparePassword = (candidatePassword, password) => {
  return bcrypt.compareSync(candidatePassword, password);
};

export {
  requestResponse,
  errorHandler,
  validationHandler,
  generateDBUri,
  comparePassword
};
