const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Role = require("../models/role.model.js");

dotenv.config();

let refreshTokens = [];

//for test purpose
module.exports.new = async (req, res) => {
	try {
		const { name } = req.body;
		const role = new Role({ name });
		const create = await Role.create(role);

		res.status(201).json(create);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while creating role"
		});
	}
};
