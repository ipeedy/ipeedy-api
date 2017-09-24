/* eslint-disable no-console */

import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import { requestOTP } from '../services/otp';

import Product from './Product';

const GeoSchema = new Schema(
  {
    type: {
      type: String,
      default: 'point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  { timestamps: true },
);

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      trim: true,
      // validate: {
      //   validator(phone) {
      //     return validator.isMobilePhone(phone, 'vi-VN');
      //   },
      //   message: '{VALUE} is not a valid phone number!',
      // },
      required: true,
    },
    geometry: GeoSchema,
    name: {
      type: String,
      trim: true,
      minlength: [2, 'Name need to be longer!'],
      maxlength: [25, 'Name need to be shorter!'],
    },
    avatar: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    authCode: {
      code: Number,
      codeValid: {
        type: Boolean,
        default: false,
      },
      generatedAt: Date,
    },
  },
  { timestamps: true },
);

UserSchema.methods = {
  async generateOTP() {
    try {
      const result = await requestOTP(this.phone);
      if (result.CodeResult !== '100') {
        return {
          error: true,
          message: 'Request OTP failed!',
        };
      }
      this.authCode.code = result.code;
      this.authCode.codeValid = true;
      this.authCode.generatedAt = new Date();
      await this.save();
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      return {
        error: false,
        message: 'OK!',
        diff_time: 30,
      };
    } catch (error) {
      throw error;
    }
  },
  async verifyOTP(code) {
    try {
      if (!this.authCode.codeValid || this.authCode.code.toString() !== code) {
        return {
          error: true,
          message: 'Verify OTP failed!',
        };
      }
      this.authCode.codeValid = false;
      await this.save();
      return {
        token: this.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },
  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },
};

UserSchema.pre('save', async function(next) {
  if (this.isModified('geometry')) {
    console.log('====================================');
    console.log('geo changed');
    console.log('====================================');
    await Product.find({ user: this._id }).update({ geometry: this.geometry });
  }
  next();
});

export default mongoose.model('User', UserSchema);
