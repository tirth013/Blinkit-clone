const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");

// Add Product
const addProductController = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    subCategory,
    unit,
    stock,
    price,
    discount,
    description,
    more_details,
    public: isPublic,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !image ||
    !category ||
    !subCategory ||
    !unit ||
    !stock ||
    !price ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  // Validate arrays
  if (!Array.isArray(image) || image.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Image must be a non-empty array." });
  }
  if (!Array.isArray(category) || category.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Category must be a non-empty array." });
  }
  if (!Array.isArray(subCategory) || subCategory.length === 0) {
    return res.status(400).json({
      success: false,
      message: "SubCategory must be a non-empty array.",
    });
  }

  // Check for duplicate product name
  const existingProduct = await productModel.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with this name already exists.",
    });
  }

  const product = new productModel({
    name,
    image,
    category,
    subCategory,
    unit,
    stock,
    price,
    discount,
    description,
    more_details,
    public: isPublic !== undefined ? isPublic : true,
  });
  await product.save();
  res.json({
    success: true,
    message: "Product added successfully",
    data: product,
  });
});

// Get Products (paginated, with search)
const getProductController = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const query = search ? { $text: { $search: search } } : {};

  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    productModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")
      .populate("subCategory"),
    productModel.countDocuments(query),
  ]);
  return res.json({
    message: "Product data",
    success: true,
    totalCount: totalCount,
    totalNoPage: Math.ceil(totalCount / limit),
    data: data,
  });
});

const getProductByCategory = asyncHandler(async (req, res) => {
  try {
    // Accept category id from route param or query param
    const id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({
        message: "Provide category id",
        success: false,
      });
    }

    // Support single or multiple category ids
    const ids = Array.isArray(id) ? id : [id];

    // Validate all ids
    const validIds = ids.filter(mongoose.Types.ObjectId.isValid);
    if (validIds.length === 0) {
      return res.status(400).json({
        message: "Invalid category id(s)",
        success: false,
      });
    }

    const products = await productModel
      .find({
        category: { $in: validIds },
      })
      .limit(16);

    return res.json({
      message: "Category product list",
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error in getProductByCategory:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});

const getProductByCategoryAndSubCategory = asyncHandler(async(req, res) => {
  let { categoryId, subCategoryId, page, limit } = req.body;

  if (!categoryId || !subCategoryId) {
    return res.status(400).json({
      message: "Provide categoryId and subCategoryId.",
      success: false
    });
  }

  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const query = {
    category: { $in: [categoryId] },
    subCategory: { $in: [subCategoryId] }
  };

  const skip = (page - 1) * limit;

  const [data, dataCount] = await Promise.all([
    productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    productModel.countDocuments(query)
  ]);

  return res.status(200).json({
    message: "Product list",
    data: data,
    totalCount: dataCount,
    page: page,
    limit: limit,
    success: true,
    error: false
  });
});

module.exports = {
  addProductController,
  getProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory
};
