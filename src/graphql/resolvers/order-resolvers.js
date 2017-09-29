import Order from '../../models/Order';
import { requireAuth, requireInfo } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const ORDER_CREATED = 'orderCreated';

export default {
  getOrders: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Order.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getOrder: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Order.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  createOrder: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      await requireInfo(user);

      const order = await Order.create({ ...args, user: user._id });

      pubsub.publish(ORDER_CREATED, { [ORDER_CREATED]: order });

      return order;
    } catch (error) {
      throw error;
    }
  },
  updateOrderStatus: async (_, { _id, status }, { user }) => {
    try {
      await requireAuth(user);
      const order = await Order.findById(_id);
      if (!order) throw new Error('Not found!');
      order.status = status;
      await order.save();
      return {
        error: false,
        message: 'Status updated!',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
  orderCreated: {
    subscribe: () => pubsub.asyncIterator(ORDER_CREATED),
  },
};
