const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Depo = require("../models/depo.model");
const mongoose = require("mongoose");

dotenv.config();

module.exports.findAll = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const depos = await Depo.find();
		res.status(200).json(depos);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while fetching depos"
		});
	}
};

module.exports.create = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { name, email, phone, address } = req.body;
		const { city, post_code, street, building, premises } = address;
		const depo = new Depo({ name, email, phone, address });

		await depo.save(depo);

		res.status(201).json({
			message: "New depo created"
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while creating depos"
		});
	}
};
