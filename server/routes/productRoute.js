const express = require("express");
const router = express.Router();
const {
  addProductController,
  getProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
} = require("../controller/productController");

router.post("/create", addProductController);
router.get("/get", getProductController);
router.post("/get-product-by-category", getProductByCategory);
router.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);

module.exports = router;
