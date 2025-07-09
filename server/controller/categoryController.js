const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const productModel = require("../models/productModel");

const addCategoryController = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
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

const getCategoryController = asyncHandler(async (req, res) => {
  const data = await categoryModel.find();
  return res.json({
    data: data,
    success: true,
  });
});

const updateCategoryController = asyncHandler(async (req, res) => {
  try {
    const { categoryId, name, image } = req.body;
    if (!categoryId || !name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const update = await categoryModel.updateOne(
      { _id: categoryId },
      { name, image }
    );
    return res.json({
      message: "Updated category!",
      success: true,
      data: update,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({
      message: "Failed to update category",
      success: false,
      error: error.message,
    });
  }
});

const deleteCategoryController = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await subCategoryModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    const checkProduct = await productModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "category is already used can't delete",
        success: false,
      });
    }

    const deleteCategory = await categoryModel.deleteOne({ _id });
    return res.json({
      message: "Category deleted successfully!",
      success: true,
      data: deleteCategory,
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({
      message: "Failed to delete category",
      success: false,
      error: error.message,
    });
  }
});

module.exports = {
  addCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
