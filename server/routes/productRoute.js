const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/", productController.addProduct);

module.exports = router;
