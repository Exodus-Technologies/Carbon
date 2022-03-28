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
    role: 'publisher',
    isAdmin: true
  },
  {
    email: 'moderator@sheenmagazine.com',
    password: PASSWORD,
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'moderator',
    isAdmin: true
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
  const dbUsers = await User.find({});
  if (!dbUsers.length) {
    users.forEach(async user => {
      const u = new User(user);
      await u.save();
    });
    console.log('Database seeding complete...');
  }
};

export default seedDB;
