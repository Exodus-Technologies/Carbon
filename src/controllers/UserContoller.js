'use strict';

import { UserService } from '../services';

exports.getUsers = async (req, res, next) => {
  try {
    const { query } = req;
    const response = await UserService.getUsers(query);
    res.send(response);
  } catch (err) {
    console.log(`Error getting users: `, err);
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const response = await UserService.createUser(body);
    res.send(response);
  } catch (err) {
    console.log(`Error creating user: `, err);
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const response = await UserService.updateUser(userId, body);
    res.send(response);
  } catch (err) {
    console.log(`Error updating user: ${userId}: `, err);
    next(err);
  }
};
