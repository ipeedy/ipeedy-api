import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, 'Name need to be longer than 4!'],
      maxlength: [25, 'Name need to be shorter than 25!'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Description need to be longer!'],
      maxlength: [100, 'Description need to be shorter!'],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    ratedTimes: {
      type: Number,
      default: 0,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', ProductSchema);
