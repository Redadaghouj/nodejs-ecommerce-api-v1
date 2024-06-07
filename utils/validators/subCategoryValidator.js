const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Subcategory name required')
    .isString()
    .isLength({ min: 3, max: 32 })
    .withMessage('Name must be between 3 and 32 characters long'),
  check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category id format'),
  validatorMiddleware,
];

const getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

module.exports = {
  createSubCategoryValidator,
  getSubCategoryValidator,
};
