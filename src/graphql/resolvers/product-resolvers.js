import Product from '../../models/Product';
import { requireAuth } from '../../services/auth';

export default {
  getProducts: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Product.find({});
    } catch (error) {
      throw error;
    }
  },
};
