const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const addCategoryController = asyncHandler(async (req, res) => {
  let { name } = req.body;
  let image;

  // If using multer for file upload
  if (req.file) {
    image = req.file.path; // or req.file.location if using cloud storage
  } else if (req.body.image) {
    image = req.body.image; // fallback for direct URL
  }

  if (!name || !image) {
    return res.status(400).json({
      message: "Enter required fields",
      success: false,
    });
  }

  const newCategory = new categoryModel({
    name,
    image,
  });

  try {
    const savedCategory = await newCategory.save();
    return res.status(201).json({
      message: "Category added successfully",
      success: true,
      category: savedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add category",
      success: false,
      error: error.message,
    });
  }
});

module.exports = {
    addCategoryController,
};
