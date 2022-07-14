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
    month: '11',
    day: '21',
    year: '1991',
    state: 'CA',
    zipCode: '90001',
    isAdmin: true
  },
  {
    email: 'sandy@gmail.com',
    password: PASSWORD,
    fullName: 'Landon',
    gender: 'M',
    city: 'NYC',
    month: '11',
    day: '21',
    year: '1991',
    state: 'AK',
    zipCode: '12345',
    isAdmin: true
  },
  {
    email: 'moderator@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Jane Doe',
    gender: 'F',
    city: 'Los Angeles',
    month: '03',
    day: '21',
    year: '1996',
    state: 'CA',
    zipCode: '90001',
    isAdmin: true
  },
  {
    email: 'subscriber@sheenmagazine.com',
    password: PASSWORD,
    fullName: 'Mary Doe',
    gender: 'F',
    month: '06',
    day: '17',
    year: '1997',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
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
