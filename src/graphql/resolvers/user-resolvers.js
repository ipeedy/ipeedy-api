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
      const diffSeconds = Math.round(
        (currentTime - user.authCode.generatedAt) % 86400000 % 3600000 / 1000,
      );
      if (diffSeconds >= 30) {
        return await user.generateOTP();
      }
      return {
        error: false,
        diff_time: 30 - diffSeconds,
      };
    } catch (error) {
      return {
        error: true,
        message: error.errors.phone.message,
      };
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
      await me.save();
      return {
        error: false,
        message: 'Info updated!',
      };
    } catch (error) {
      return {
        error: true,
        message: 'Somethings went wrong!',
      };
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
