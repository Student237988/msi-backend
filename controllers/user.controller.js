const { validationResult } = require("express-validator");
const User = require("../models/user.model.js");

//for test purpose
exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occured while retrieving users",
    });
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newUser = new User();
    newUser.login = req.body.login;
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    await newUser.save(newUser);
    res.status(201).json({
      message: 'New user created'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occured while creating user",
    });
  }
};
