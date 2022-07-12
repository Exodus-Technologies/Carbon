'use strict';

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV } = config;

//TOKEN SCHEMA
//  ============================================
const optCodeSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    ref: 'user'
  },
  email: {
    type: String,
    required: true
  },
  optCode: {
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
optCodeSchema.set('autoCreate', NODE_ENV !== 'production');

/**
 * Increments optId everytime an instances is created
 */
optCodeSchema.plugin(autoIncrement, { inc_field: 'optCodeId' });

/**
 * Create Code model out of optCodeSchema
 */
const Code = mongoose.model('Code', optCodeSchema);

export default Code;
