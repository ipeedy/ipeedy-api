import Product from '../../models/Product';
import { requireAuth, requireInfo } from '../../services/auth';

export default {
  getProducts: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Product.find({});
    } catch (error) {
      throw error;
    }
  },
  createProduct: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      await requireInfo(user);

      return await Product.create({ ...args, user: user._id });
    } catch (error) {
      throw error;
    }
  },
};
