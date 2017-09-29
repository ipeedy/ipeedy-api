import mongoose, { Schema } from 'mongoose';

/**
|--------------------------------------------------
| Status Code:
| -1: Cancel
| 0: Pending
| 1: Accepted
| 2: Delivering
| 3: Success
|--------------------------------------------------
*/

const OrderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
