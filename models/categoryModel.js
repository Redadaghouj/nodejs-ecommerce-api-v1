const mongoose = require('mongoose');

// Create Schema
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    // A and B --> shopping.com/a-and-b
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
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
