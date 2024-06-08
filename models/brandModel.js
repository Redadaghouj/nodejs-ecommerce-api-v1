const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      trim: true,
      minlength: [3, 'Too short brand name'],
      maxlength: [32, 'Too long brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Create model
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
