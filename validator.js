const { check } = require("express-validator");

exports.validateUser = [
  check("login", "Login has invalid form").isEmail(),
  check("password", "Password must contains at least 8 characters").isLength({
    min: 8,
  }),
  check("name", "Name can not be empty").not().isEmpty(),
];
