const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("role", roleSchema, "role");
