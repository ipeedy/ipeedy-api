import User from '../../models/User';

export default {
  generateOTP: async (_, { phone }) => {
    try {
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({ phone });
      }
      if (!user.authCode.codeValid) {
        return await user.generateOTP(phone);
      }
      const currentTime = new Date();
      const diffMins = Math.round(
        (currentTime - user.authCode.generatedAt) % 86400000 % 3600000 / 60000,
      );
      if (diffMins >= 15) {
        return await user.generateOTP(phone);
      }
      return {
        error: true,
        message: `Try again after ${15 - diffMins} minutes`,
      };
    } catch (error) {
      throw error;
    }
  },
};
