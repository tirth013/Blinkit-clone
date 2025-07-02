const express = require("express");
const { addCategoryController } = require("../controller/categoryController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = express.Router();

// Use multer middleware for image upload
router.route("/add-category").post(auth, upload.single('image'), addCategoryController);

module.exports = router;
