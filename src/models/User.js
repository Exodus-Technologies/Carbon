'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';
import { GENDERS, STATES } from '../constants';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV, HASH_SALT } = config;

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
    fullName: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: GENDERS
    },
    city: { type: String, required: true },
    state: {
      type: String,
      required: true,
      enum: STATES
    },
    zipCode: { type: String, required: true },
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
  const salt = bcrypt.genSaltSync(HASH_SALT);
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
