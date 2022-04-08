const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: mongoose.Schema.Types.String,
    name: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    depos: [
      {
        depo_id: mongoose.Schema.Types.String,
        role_id: mongoose.Schema.Types.String,
      },
    ],
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("user", userSchema, "user");
