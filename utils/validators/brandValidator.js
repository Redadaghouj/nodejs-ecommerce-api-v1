const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const createBrandValidator = [
  check('name')
    .isString()
    .notEmpty()
    .withMessage('Brand name required')
    .isLength({ min: 3, max: 32 })
    .withMessage('Name must be between 3 and 32 characters long'),
  validatorMiddleware,
];

const getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware,
];

const updateBrandValidator = [
  getBrandValidator,
  createBrandValidator,
  validatorMiddleware,
];

const deleteBrandValidator = [getBrandValidator];

module.exports = {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};
