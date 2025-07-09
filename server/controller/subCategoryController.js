const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// Add Subcategory
const addSubCategory = asyncHandler(async (req, res) => {
  const { name, image, category } = req.body;
  if (!name || !image || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res
      .status(400)
      .json({ success: false, message: "Category does not exist" });
  }
  const subCategory = new SubCategory({ name, image, category });
  await subCategory.save();
  res.json({ success: true, message: "Subcategory added", data: subCategory });
});

// Get all Subcategories
const getSubCategory = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find().populate("category");
  res.json({ success: true, data: subCategories });
});

// Update Subcategory
const updateSubCategory = asyncHandler(async (req, res) => {
  const { _id, name, image, category } = req.body;
  if (!_id || !name || !image || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const subCategory = await SubCategory.findByIdAndUpdate(
    _id,
    { name, image, category },
    { new: true }
  );
  res.json({
    success: true,
    message: "Subcategory updated",
    data: subCategory,
  });
});

// Delete Subcategory
const deleteSubCategory = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    return res
      .status(400)
      .json({ success: false, message: "Subcategory ID is required" });
  }
  await SubCategory.findByIdAndDelete(_id);
  res.json({ success: true, message: "Subcategory deleted" });
});

module.exports = {
  addSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
