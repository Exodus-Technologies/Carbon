'use strict';

import config from '../config';
import models from '../models';

const { User } = models;
const { PASSWORD } = config;

const users = [
  {
    email: 'publisher@sheenmagazine.com',
    password: PASSWORD,
    firstName: 'John',
    lastName: 'Doe',
    role: 'publisher'
  },
  {
    email: 'moderator@sheenmagazine.com',
    password: PASSWORD,
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'moderator'
  },
  {
    email: 'subscriber@sheenmagazine.com',
    password: PASSWORD,
    firstName: 'Mary',
    lastName: 'Doe',
    role: 'subscriber'
  }
];

const seedDB = async () => {
  const defaultUser = await User.findOne({ email: users[0].email });
  if (!defaultUser) {
    users.forEach(async user => {
      const u = new User(user);
      await u.save();
    });
  }
};

module.exports = seedDB;
