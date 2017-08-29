import User from '../../models/User';
import { requireAuth } from '../../services/auth';

export default {
  generateOTP: async (_, { phone }) => {
    try {
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({ phone });
      }
      if (!user.authCode.codeValid) {
        return await user.generateOTP();
      }
      const currentTime = new Date();
      const diffMins = Math.round(
        (currentTime - user.authCode.generatedAt) % 86400000 % 3600000 / 60000,
      );
      if (diffMins >= 15) {
        return await user.generateOTP();
      }
      return {
        error: true,
        message: `Try again after ${15 - diffMins} minutes!`,
      };
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (_, { phone, code }) => {
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return {
          error: true,
          message: 'User not found!',
        };
      }
      return user.verifyOTP(code);
    } catch (error) {
      throw error;
    }
  },
  me: async (_, args, { user }) => {
    try {
      return await requireAuth(user);
    } catch (error) {
      throw error;
    }
  },
  updateInfo: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      Object.entries(args).forEach(([key, value]) => {
        if (value) me[key] = value;
      });
      return me.save();
    } catch (error) {
      throw error;
    }
  },
  getUsers: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return User.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getUser: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return User.findById(_id);
    } catch (error) {
      throw error;
    }
  },
};
