const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    more_details: {
      type: Object,
      default: {},
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a text index
productSchema.index(
  { name: "text", description: "text" },
  { weights: { name: 10, description: 5 } }
);

module.exports = mongoose.model("product", productSchema);
