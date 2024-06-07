const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const statusText = require('../utils/httpStatusText');
const ApiError = require('../utils/apiError');

exports.createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.create({
    name: req.body.name,
    slug: slugify(req.body.name),
    category: req.body.category,
  });
  res.status(201).json({ status: statusText.SUCCESS, data: { subCategory } });
});

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const subCategories = await SubCategory.find({}, { __v: false })
    .populate('category')
    .skip((page - 1) * limit)
    .limit(limit);

  if (!subCategories) {
    res.status(200).json({ status: statusText.SUCCESS, data: null });
  }

  res.status(200).json({
    status: statusText.SUCCESS,
    result: subCategories.length,
    page,
    data: { subCategories },
  });
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id, {
    __v: false,
  }).populate('category');

  if (!subCategory) {
    return next(new ApiError('SubCategory not found', 404));
  }

  res.status(200).json({ status: statusText.SUCCESS, data: { subCategory } });
});
