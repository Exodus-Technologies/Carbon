'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config';

const { Schema } = mongoose;
const { NODE_ENV } = config;

const saltRounds = 10;

//USER SCHEMA
//  ============================================
const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      match: /\S+@\S+\.\S+/,
      index: true
    },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  { timestamps: true }
);

//HASH PASSWORD
//  ============================================

//Hash password before saving
userSchema.pre('save', function (next) {
  const user = this;

  //Hash password only if the password has been changed or is new
  if (!user.isModified('password')) return next();

  //Generate Salt
  bcrypt.genSalt(saltRounds, function (_, salt) {
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      //Change the password to the hash version
      user.password = hash;
      next();
    });
  });
});

//Create method to compare a given password with the database hash
userSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

/**
 * Set the autoCreate option on models if not on production
 */
userSchema.set('autoCreate', NODE_ENV !== 'production');

/**
 * Create User model out of userSchema
 */
const User = mongoose.model('User', userSchema);

export default User;
