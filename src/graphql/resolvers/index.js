import ProductResolvers from './product-resolvers';
import UserResolvers from './user-resolvers';

export default {
  Query: {
    getProducts: ProductResolvers.getProducts,
  },
  Mutation: {
    generateOTP: UserResolvers.generateOTP,
    verifyOTP: UserResolvers.verifyOTP,
  },
};
