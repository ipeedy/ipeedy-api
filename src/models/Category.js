import mongoose, { Schema } from 'mongoose';

import Product from './Product';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
    },
    icon: {
      type: String,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.methods = {
  async addProduct(product) {
    if (!this.products.includes(product)) {
      this.products.push(product);
      return await this.save();
    }
  },
  async removeProduct(product) {
    this.products.pop(product);
    return await this.save();
  },
};

CategorySchema.post('remove', (category, next) => {
  category.products.map(async productId => {
    const product = await Product.findById(productId);
    await product.resetCategory();
  });
  next();
});

export default mongoose.model('Category', CategorySchema);
