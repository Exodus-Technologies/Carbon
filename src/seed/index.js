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
    city: 'Los Angeles',
    dob: '06/17/1997',
    state: 'CA',
    isAdmin: true
  },
  {
    email: 'sandy@gmail.com',
    password: PASSWORD,
    fullName: 'Landon',
    city: 'NYC',
    dob: '06/17/1997',
    state: 'AK',
    isAdmin: true
  },
  {
    email: 'moderator@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Jane Doe',
    city: 'Los Angeles',
    dob: '06/17/1997',
    state: 'CA',
    isAdmin: true
  },
  {
    email: 'subscriber@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Mary Doe',
    dob: '06/17/1997',
    city: 'Los Angeles',
    state: 'CA',
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
