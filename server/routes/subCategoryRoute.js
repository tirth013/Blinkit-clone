const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/subCategoryController");

router.post("/add-subcategory", subCategoryController.addSubCategory);
router.get("/get", subCategoryController.getSubCategory);
router.put("/update", subCategoryController.updateSubCategory);
router.delete("/delete", subCategoryController.deleteSubCategory);

module.exports = router;
