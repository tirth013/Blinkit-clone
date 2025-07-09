const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createProductController,
  getProductController,
} = require("../controller/productController");

router.post("/create", auth, createProductController);
router.get("/get", getProductController);

module.exports = router;
