const express = require("express");
const { addCategoryController, getCategoryController } = require("../controller/categoryController");
const auth = require("../middleware/auth");
const router = express.Router();

// Route for adding a category (expects name and image string in body)
router.post("/add-category", auth, addCategoryController);
router.get("/get", getCategoryController);

module.exports = router;
