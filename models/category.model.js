const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
  comment: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("category", categorySchema, "category");
