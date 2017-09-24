import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import shortid from 'shortid';

import Category from './Category';

const GeoSchema = new Schema(
  {
    type: {
      type: String,
      default: 'point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  { timestamps: true },
);

const Review = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      trim: true,
      required: true,
      minlength: [10, 'Review need to be longer!'],
      maxlength: [100, 'Review need to be shorter!'],
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, 'Name need to be longer than 4!'],
      maxlength: [25, 'Name need to be shorter than 25!'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: new mongoose.Types.ObjectId('59c3b776410ba0f1168e12c8'),
    },
    slug: {
      type: String,
      unique: true,
    },
    geometry: GeoSchema,
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Description need to be longer!'],
      maxlength: [200, 'Description need to be shorter!'],
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    availableCount: {
      type: Number,
      default: 0,
    },
    orderRange: [
      {
        type: Number,
        default: [1, 10],
      },
    ],
    reviews: [Review],
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.post('init', function() {
  this._original = this.toObject();
});

ProductSchema.pre('validate', function(next) {
  this._slugify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = slug(`${this.name.toLowerCase()}${shortid.generate()}`);
  },
  async resetCategory() {
    this.category = new mongoose.Types.ObjectId('59c3b776410ba0f1168e12c8');
    return await this.save();
  },
};

ProductSchema.post('save', async function(product, next) {
  if (this._original) {
    if (this._original.category !== product.category) {
      const oldCategory = await Category.findById(this._original.category);
      await oldCategory.removeProduct(product._id);
      const category = await Category.findById(product.category);
      if (category) {
        await category.addProduct(product._id);
      } else {
        await this.resetCategory();
      }
    }
  } else {
    const category = await Category.findById(product.category);
    if (category) {
      await category.addProduct(product._id);
    } else {
      await this.resetCategory();
    }
  }
  next();
});

ProductSchema.post('remove', async (product, next) => {
  const category = await Category.findById(product.category);
  if (category) await category.removeProduct(product._id);
  next();
});

export default mongoose.model('Product', ProductSchema);
