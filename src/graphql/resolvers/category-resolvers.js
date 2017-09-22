import Category from '../../models/Category';
import { requireAuth, requireInfo } from '../../services/auth';

export default {
  getCategories: () => {
    try {
      return Category.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getCategory: (_, { _id }) => {
    try {
      return Category.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      await requireInfo(user);

      return await Category.create({ ...args, user: user._id });
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const category = await Category.findOne({ _id, user: user._id });
      if (!category) {
        throw new Error('Not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        category[key] = value;
      });

      return category.save();
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const category = await Category.findOne({ _id, user: user._id });
      if (!category) {
        throw new Error('Not found!');
      }
      await category.remove();
      return {
        message: 'Delete success!',
      };
    } catch (error) {
      throw error;
    }
  },
};
