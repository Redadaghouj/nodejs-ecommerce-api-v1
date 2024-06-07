const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subcategory required'],
      unqiue: [true, 'This subcategory already exist'],
      trim: true,
      minlength: [3, 'Too short subcategory name'],
      maxlength: [32, 'Too long subcategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Subcategory must be belong to parent category'],
      },
    ],
  },
  { timestamps: true }
);

const SubCategory = mongoose.model('Subcategory', subCategorySchema);

module.exports = SubCategory;
