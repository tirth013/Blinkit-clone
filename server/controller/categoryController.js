const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

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


const getCategoryController = asyncHandler(async(req,res)=>{
  const data = await categoryModel.find()
  return res.json({
    data:data,
    success:true
  })
})


module.exports = {
    addCategoryController,getCategoryController
};
