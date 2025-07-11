const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add Product
const createProductController = asyncHandler(async (req, res) => {
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
      .json({ success: false, message: "At least one image is required." });
  }
  if (!Array.isArray(category) || category.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "At least one category is required." });
  }
  if (!Array.isArray(subCategory) || subCategory.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one subcategory is required.",
    });
  }

  // Check for duplicate product name
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product with this name already exists.",
    });
  }

  const product = new Product({
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

const getProductController = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const query = search ? { $text: { $search: search } } : {};

  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")
      .populate("subCategory"),
    Product.countDocuments(query),
  ]);
  return res.json({
    message: "Product data",
    success: true,
    totalCount: totalCount,
    totalNoPage: Math.ceil(totalCount / limit),
    data: data,
  });
});

module.exports = { createProductController, getProductController };
