const express = require("express");
const router = express.Router();
const {
  addProductController,
  getProductController,
  getProductByCategory,
} = require("../controller/productController");

router.post("/create", addProductController);
router.get("/get", getProductController);
router.post("/get-product-by-category", getProductByCategory);
module.exports = router;
