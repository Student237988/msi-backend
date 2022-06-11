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
		const { name, email, phone, city, post_code, street, building, lat, lng } =
			req.body;
		const depo = new Depo({
			name,
			email,
			phone,
			city,
			post_code,
			street,
			building,
			lat,
			lng
		});
		const create = await Depo.create(depo);

		res.status(201).json(create);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while creating depo"
		});
	}
};

module.exports.update = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const updateId = req.get("infoPointId");
		if (!updateId) throw new Error("infoPointId header is missing");
		const { name, email, phone, city, post_code, street, building, lat, lng } =
			req.body;
		const update = await Depo.findByIdAndUpdate(updateId, req.body, {
			new: true,
			rawResult: true // Return the raw result from the MongoDB driver
		});
		if (update.value == null)
			throw new Error(`Could not update depo with id ${updateid}`);
		res.status(200).json(update.value);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while updating depo"
		});
	}
};
