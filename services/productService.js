const asyncHandler = require('express-async-handler');
const { default: slugify } = require('slugify');
const Product = require('../models/productModel');
const statusText = require('../utils/httpStatusText');
const ApiError = require('../utils/apiError');

/**
 * @desc Create Product
 * @route /api/v1/products
 * @method POST
 * @access Private
 */
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const product = await Product.create(req.body);
  res.status(201).json({ status: statusText.SUCCESS, data: { product } });
});

/**
 * @desc Get all products
 * @route /api/v1/products
 * @method GET
 * @access Private
 */
exports.getProducts = asyncHandler(async (req, res) => {
  const reqQueryClone = { ...req.query };
  const excludesFields = ['page', 'limit'];
  excludesFields.forEach((field) => delete reqQueryClone[field]);

  let queryStr = JSON.stringify(reqQueryClone);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  queryStr = JSON.parse(queryStr);
  console.log(queryStr);

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  // Build query
  const mongooseQuery = Product.find(queryStr, { __v: false })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({ path: 'category', select: 'name -_id' });

  // Execute query
  const products = await mongooseQuery;

  res.status(200).json({
    status: statusText.SUCCESS,
    result: products.length,
    page,
    data: { products },
  });
});

/**
 * @desc Get product by id
 * @route /api/v1/products/:id
 * @method GET
 * @access Public
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id, {
    __v: false,
  }).populate({ path: 'category', select: 'name -_id' });
  if (!product) {
    return next(new ApiError('Product not found', 404));
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    data: { product },
  });
});

/**
 * @desc Update product
 * @route /api/v1/products/:id
 * @method PUT
 * @access Private
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!product) {
    return next(new ApiError('Product not found', 404));
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    data: { product },
  });
});

/**
 * @desc Delete product
 * @route /api/v1/products/:id
 * @method DELETE
 * @access Private
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError('Product not found', 404));
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    data: null,
  });
});
