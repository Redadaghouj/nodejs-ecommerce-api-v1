const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const statusText = require('../utils/httpStatusText');
const ApiError = require('../utils/apiError');

/** @route /api/v1/categories/:id/subcategories */
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.id;
  next();
};

exports.createQueryObject = (req, res, next) => {
  const query = {};
  if (req.params.id) {
    query.category = req.params.id; // i access to id of category because mergeParams allow me to
  }
  req.query = query;
  next();
};

/**
 * @desc Create SubCategory
 * @route /api/v1/subcategories
 * @method POST
 * @access Private
 */
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ status: statusText.SUCCESS, data: { subCategory } });
});

/**
 * @desc Get SubCategories
 * @route /api/v1/subcategories
 * @method GET
 * @access Public
 */
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const subCategories = await SubCategory.find(req.query, { __v: false })
    .skip((page - 1) * limit)
    .limit(limit);
  // .populate({ path: 'category', select: 'name -_id' })
  res.status(200).json({
    status: statusText.SUCCESS,
    result: subCategories.length,
    page,
    data: { subCategories },
  });
});

/**
 * @desc Get SubCategory by id
 * @route /api/v1/subcategories/:id
 * @method GET
 * @access Public
 */
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id, {
    __v: false,
  });

  if (!subCategory) {
    return next(new ApiError('SubCategory not found', 404));
  }

  res.status(200).json({ status: statusText.SUCCESS, data: { subCategory } });
});

/**
 * @desc Update SubCategory by id
 * @route /api/v1/subcategories/:id
 * @method PUT
 * @access Private
 */
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const updateFields = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...(name && { name, slug: slugify(name) }),
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...(category && { category }),
  };

  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateFields,
    },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError('Sub category not found', 404));
  }
  res.status(200).json({ status: statusText.SUCCESS, data: { subCategory } });
});

/**
 * @desc Delete SubCategory by id
 * @route /api/v1/subcategories/:id
 * @method Delete
 * @access Private
 */
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory =
    await SubCategory.findByIdAndDelete(id).populate('category');
  if (!subCategory) {
    return next(new ApiError('Sub category not found', 404));
  }
  res.status(200).json({ status: statusText.SUCCESS, data: null });
});
