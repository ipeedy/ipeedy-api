/* eslint-disable no-console */

import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

import { requestOTP } from '../services/otp';

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator(phone) {
          return validator.isMobilePhone(phone, 'vi-VN');
        },
        message: '{VALUE} is not a valid phone number!',
      },
      required: true,
    },
    name: {
      type: String,
      trim: true,
      minlength: [2, 'Name need to be longer!'],
      maxlength: [25, 'Name need to be shorter!'],
    },
    avatar: String,
    email: {
      type: String,
      unique: true,
      trim: true,
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
  async generateOTP(phone) {
    try {
      const result = await requestOTP(phone);
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
      };
    } catch (error) {
      throw error;
    }
  },
};

export default mongoose.model('User', UserSchema);
