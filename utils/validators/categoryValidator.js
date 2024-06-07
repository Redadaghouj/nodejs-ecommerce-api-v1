const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createCategoryValidator = [
  check('name')
    .isString()
    .notEmpty()
    .withMessage('Category name required')
    .isLength({ min: 3, max: 32 })
    .withMessage('Name must be between 3 and 32 characters long'),
  validatorMiddleware,
];

const getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

const updateCategoryValidator = [
  getCategoryValidator,
  createCategoryValidator,
  validatorMiddleware,
];

const deleteCategoryValidator = [getCategoryValidator];

module.exports = {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
