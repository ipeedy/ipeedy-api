import Product from '../../models/Product';
import { requireAuth, requireInfo } from '../../services/auth';

export default {
  getProducts: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Product.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getProduct: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Product.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getUserProducts: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Product.find({ user: user._id }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getNearbyProducts: async (_, { longitude, latitude, distance }, { user }) => {
    try {
      await requireAuth(user);
      const lng = parseFloat(longitude);
      const lat = parseFloat(latitude);
      const dis = parseInt(distance, 10);
      return await Product.geoNear(
        {
          type: 'Point',
          coordinates: [lng, lat],
        },
        {
          maxDistance: dis || 5000,
          spherical: true,
        },
      );
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
