const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createProductValidator = [
  check('name')
    .isString()
    .withMessage('Name must be string')
    .notEmpty()
    .withMessage('Name required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long'),
  check('description')
    .notEmpty()
    .withMessage('Description required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters long'),
  check('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .notEmpty()
    .withMessage('Quantity required'),
  check('sold').optional().isNumeric().withMessage('Sold must be a number'),
  check('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .notEmpty()
    .withMessage('Price required')
    .isLength({ max: 6 })
    .withMessage('Too long price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat()
    .isLength({ max: 6 })
    .withMessage('Too long price')
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
  check('colors')
    .optional()
    .isArray()
    .withMessage('Colors should be array of string'),
  check('imageCover').notEmpty().withMessage('Image cover required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images should be array of string'),
  check('category')
    .notEmpty()
    .withMessage('Product must be belong to category')
    .isMongoId()
    .withMessage('Invalid category id format'),
  check('subcategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid sub-category id format'),
  check('brand').optional().isMongoId().withMessage('Invalid brand id format'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingAverage must be a number')
    .isLength({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),
  validatorMiddleware,
];

const getProductValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

const updateProductValidator = [
  check('name')
    .isString()
    .withMessage('Name must be string')
    .optional()
    .notEmpty()
    .withMessage('Name required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description required')
    .isLength({ min: 10 })
    .withMessage('Description is too short'),
  check('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .optional()
    .notEmpty()
    .withMessage('Quantity required'),
  check('sold').optional().isNumeric().withMessage('Sold must be a number'),
  check('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .optional()
    .notEmpty()
    .withMessage('Price required')
    .isLength({ max: 20 })
    .withMessage('Too long product price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .isLength({ max: 6 })
    .withMessage('Too long price')
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
  check('colors')
    .optional()
    .isArray()
    .withMessage('Colors should be array of string'),
  check('imageCover').optional().notEmpty().withMessage('Image cover required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images should be array of string'),
  check('category')
    .optional()
    .notEmpty()
    .withMessage('Product must be belong to category')
    .isMongoId()
    .withMessage('Invalid category id format'),
  check('subcategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid sub-category id format'),
  check('brand').optional().isMongoId().withMessage('Invalid brand id format'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingAverage must be a number')
    .isLength({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),
  validatorMiddleware,
];

const deleteProductValidator = [getProductValidator];

module.exports = {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
