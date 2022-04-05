'use strict';

import config from '../config';
import models from '../models';

const { User } = models;
const { PASSWORD } = config;

const users = [
  {
    email: 'publisher@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Jon Doe',
    gender: 'M',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    role: 'publisher',
    isAdmin: true
  },
  {
    email: 'moderator@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Jane Doe',
    gender: 'F',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    role: 'moderator',
    isAdmin: true
  },
  {
    email: 'subscriber@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Mary Doe',
    gender: 'F',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    role: 'subscriber',
    isAdmin: false
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
