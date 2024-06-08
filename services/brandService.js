const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel');
const statusText = require('../utils/httpStatusText');
const ApiError = require('../utils/apiError');

/**
 * @desc Create Brand
 * @route /api/v1/brands
 * @method POST
 * @access Private
 */
exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create({
    name: req.body.name,
    slug: slugify(req.body.name),
  });
  // newBrand.slug = slugify(req.body.name);
  // await newBrand.save();
  res.status(201).json({
    status: statusText.SUCCESS,
    data: { brand },
  });
});

/**
 * @desc Get Brand by id
 * @route /api/v1/brands/:id
 * @method GET
 * @access Public
 */
exports.getBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id, { __v: false });
  if (!brand) {
    return next(new ApiError('Brand not found', 404));
  }
  res.status(200).json({ status: statusText.SUCCESS, data: { brand } });
});

/**
 * @desc Get all brands
 * @route /api/v1/brands
 * @method GET
 * @access Public
 */
exports.getBrands = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const brands = await Brand.find({}, { __v: false })
    .skip((page - 1) * limit)
    .limit(limit);

  if (!brands) {
    res.status(200).json({ status: statusText.SUCCESS, data: null });
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    result: brands.length,
    page,
    data: { brands },
  });
});

/**
 * @desc Update Brand by id
 * @route /api/v1/brands/:id
 * @method PUT
 * @access Private
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, slug: slugify(req.body.name) },
    },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError('Brand not found', 404));
  }
  res.status(200).json({ status: statusText.SUCCESS, data: { brand } });
});

/**
 * @desc Delete Brand by id
 * @route /api/v1/brands/:id
 * @method DELETE
 * @access Private
 */
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    return next(new ApiError('Brand not found', 404));
  }
  res.status(200).json({ status: statusText.SUCCESS, data: null });
});
