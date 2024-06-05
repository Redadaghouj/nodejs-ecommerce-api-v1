const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const statusText = require('../utility/httpStatusText');
/**
 * @desc Create category
 * @route /api/v1/categories
 * @method POST
 * @access Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({
    ...req.body,
    slug: slugify(req.body.name),
  });
  // newCategory.slug = slugify(req.body.name);
  // await newCategory.save();
  res.status(201).json({
    status: statusText.SUCCESS,
    data: { category },
  });
});

/**
 * @desc Get category by id
 * @route /api/v1/categories/:id
 * @method GET
 * @access Private
 */
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id, { __v: false });
  if (!category) {
    res
      .status(404)
      .json({ status: statusText.FAIL, message: 'Category not found' });
  }
  res.status(200).json({ status: statusText.SUCCESS, data: { category } });
});

/**
 * @desc Get all categories
 * @route /api/v1/categories
 * @method GET
 * @access Private
 */
exports.getCategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 3;

  const categories = await Category.find({}, { __v: false })
    .skip((page - 1) * limit)
    .limit(limit);

  if (!categories) {
    res.status(200).json({ status: statusText.SUCCESS, data: null });
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    result: categories.length,
    page,
    data: { categories },
  });
});

/**
 * @desc Update category by id
 * @route /api/v1/categories/:id
 * @method PUT
 * @access Private
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const categoryUpdated = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ...req.body, slug: slugify(req.body.name) },
    },
    { new: true }
  );
  if (!categoryUpdated) {
    res
      .status(404)
      .json({ status: statusText.FAIL, message: 'Category not found' });
  }
  res
    .status(200)
    .json({ status: statusText.SUCCESS, data: { categoryUpdated } });
});

/**
 * @desc Delete category by id
 * @route /api/v1/categories/:id
 * @method DELETE
 * @access Private
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const deletedCourse = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCourse) {
    res
      .status(404)
      .json({ status: statusText.FAIL, message: 'Category not found' });
  }
  res.status(200).json({ status: statusText.SUCCESS, data: null });
});
