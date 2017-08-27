import ProductResolvers from './product-resolvers';

export default {
  Query: {
    getProducts: ProductResolvers.getProducts,
  },
};
