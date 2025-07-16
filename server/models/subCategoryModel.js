const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

subCategorySchema.index({ name: 1, category: 1 }, { unique: true });
subCategorySchema.index({ category: 1 }, { unique: true });

module.exports = mongoose.model("subCategory", subCategorySchema);
