const mongoose = require("mongoose");

const productSchem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant"
  }]
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchem);
module.exports = Product;
