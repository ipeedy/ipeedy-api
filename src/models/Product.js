import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import shortid from 'shortid';

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
}, { timestamps: true });

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
    geometry: GeoSchema,
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

ProductSchema.pre('validate', function(next) {
  this._slugify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = slug(`${this.name.toLowerCase()}${shortid.generate()}`);
  },
};

export default mongoose.model('Product', ProductSchema);
