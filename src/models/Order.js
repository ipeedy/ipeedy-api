import mongoose, { Schema } from 'mongoose';

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
    userLocation: [
      {
        type: Number,
        required: true,
      },
    ],
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerLocation: [
      {
        type: Number,
        required: true,
      },
    ],
    amount: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
