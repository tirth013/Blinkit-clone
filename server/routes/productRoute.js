const express = require("express");
const router = express.Router();
const {addProductController,getProductController} = require("../controller/productController");

router.post("/", addProductController);
router.get("/", getProductController);

module.exports = router;
