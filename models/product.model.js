const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
  total_quantity: mongoose.Schema.Types.Number,
  category_id: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("product", productSchema, "product");
