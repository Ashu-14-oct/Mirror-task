const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  additionalCost: {
    type: Number,
    default: 0,
  },
  stockCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Variant = mongoose.model("Variant", variantSchema);
module.exports = Variant;
