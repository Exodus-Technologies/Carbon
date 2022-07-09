'use strict';

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV } = config;

//TOKEN SCHEMA
//  ============================================
const tokenSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    ref: 'user'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // this is the expiry time in seconds
  }
});

/**
 * Set the autoCreate option on models if not on production
 */
tokenSchema.set('autoCreate', NODE_ENV !== 'production');

/**
 * Increments tokenId everytime an instances is created
 */
tokenSchema.plugin(autoIncrement, { inc_field: 'tokenId' });

/**
 * Create Token model out of tokenSchema
 */
const Token = mongoose.model('Token', tokenSchema);

export default Token;
