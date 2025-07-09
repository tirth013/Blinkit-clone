const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add Product
const addProduct = asyncHandler(async (req, res) => {
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
    return res
      .status(400)
      .json({
        success: false,
        message: "SubCategory must be a non-empty array.",
      });
  }

  // Check for duplicate product name
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res
      .status(400)
      .json({
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

module.exports = { addProduct };
