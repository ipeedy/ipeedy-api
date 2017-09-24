import GraphQLDate from 'graphql-date';

import ProductResolvers from './product-resolvers';
import UserResolvers from './user-resolvers';
import CategoryResolvers from './category-resolvers';

import User from '../../models/User';
import Product from '../../models/Product';
import Category from '../../models/Category';

export default {
  Date: GraphQLDate,
  Product: {
    user: ({ user }) => User.findById(user),
    category: ({ category }) => Category.findById(category),
  },
  Review: {
    user: ({ user }) => User.findById(user),
  },
  Category: {
    user: ({ user }) => User.findById(user),
    products: ({ products }) =>
      products.map(product => Product.findById(product)),
  },
  Query: {
    getProduct: ProductResolvers.getProduct,
    getProducts: ProductResolvers.getProducts,
    getUserProducts: ProductResolvers.getUserProducts,
    getNearbyProducts: ProductResolvers.getNearbyProducts,
    getCategory: CategoryResolvers.getCategory,
    getCategories: CategoryResolvers.getCategories,
    me: UserResolvers.me,
    getUser: UserResolvers.getUser,
    getUsers: UserResolvers.getUsers,
  },
  Mutation: {
    generateOTP: UserResolvers.generateOTP,
    verifyOTP: UserResolvers.verifyOTP,
    updateInfo: UserResolvers.updateInfo,
    updateLocation: UserResolvers.updateLocation,
    createProduct: ProductResolvers.createProduct,
    updateProduct: ProductResolvers.updateProduct,
    deleteProduct: ProductResolvers.deleteProduct,
    createCategory: CategoryResolvers.createCategory,
    updateCategory: CategoryResolvers.updateCategory,
    deleteCategory: CategoryResolvers.deleteCategory,
  },
};
