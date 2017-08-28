import User from '../../models/User';

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
};
