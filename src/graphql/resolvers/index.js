import GraphQLDate from 'graphql-date';

import ProductResolvers from './product-resolvers';
import UserResolvers from './user-resolvers';

import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Product: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getProduct: ProductResolvers.getProduct,
    getProducts: ProductResolvers.getProducts,
    getUserProducts: ProductResolvers.getUserProducts,
    getNearbyProducts: ProductResolvers.getNearbyProducts,
    me: UserResolvers.me,
  },
  Mutation: {
    generateOTP: UserResolvers.generateOTP,
    verifyOTP: UserResolvers.verifyOTP,
    updateInfo: UserResolvers.updateInfo,
    createProduct: ProductResolvers.createProduct,
  },
};
