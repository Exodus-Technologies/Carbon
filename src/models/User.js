'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';
import { ROLES } from '../constants';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV, HASH_SALT } = config;

const saltRounds = Number(HASH_SALT);

//USER SCHEMA
//  ============================================
const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: /\S+@\S+\.\S+/,
      index: true
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ROLES,
      default: 'subscriber'
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

//HASH PASSWORD
// ============================================

//Hash password before saving
userSchema.pre('save', function (next) {
  const user = this;

  //Hash password only if the password has been changed or is new
  if (!user.isModified('password')) return next();

  //Generate Salt
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
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
 * Increments userId everytime an instances is created
 */
userSchema.plugin(autoIncrement, { inc_field: 'userId' });

/**
 * Create User model out of userSchema
 */
const User = mongoose.model('User', userSchema);

export default User;
