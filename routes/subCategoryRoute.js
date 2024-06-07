const express = require('express');
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
} = require('../services/subCategoryService');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const router = express.Router();

router
  .route('/')
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
router.route('/:id').get(getSubCategoryValidator, getSubCategory);

module.exports = router;
