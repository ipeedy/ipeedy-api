import GraphQLDate from 'graphql-date';

import ProductResolvers from './product-resolvers';
import UserResolvers from './user-resolvers';
import CategoryResolvers from './category-resolvers';
import OrderResolvers from './order-resolvers';

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
  Order: {
    user: ({ user }) => User.findById(user),
    seller: ({ seller }) => User.findById(seller),
    product: ({ product }) => Product.findById(product),
  },
  Query: {
    getProduct: ProductResolvers.getProduct,
    getProducts: ProductResolvers.getProducts,
    getMostFavProducts: ProductResolvers.getMostFavProducts,
    getUserProducts: ProductResolvers.getUserProducts,
    getNearbyProducts: ProductResolvers.getNearbyProducts,
    getCategory: CategoryResolvers.getCategory,
    getCategories: CategoryResolvers.getCategories,
    me: UserResolvers.me,
    getUser: UserResolvers.getUser,
    getUsers: UserResolvers.getUsers,
    getOrder: OrderResolvers.getOrder,
    getOrders: OrderResolvers.getOrders,
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
    createOrder: OrderResolvers.createOrder,
    updateOrderStatus: OrderResolvers.updateOrderStatus,
  },
  Subscription: {
    orderCreated: OrderResolvers.orderCreated,
  },
};
