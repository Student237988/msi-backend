const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model.js");
const Depo = require("../models/depo.model.js");
const Role = require("../models/role.model.js");
const roleRoutes = require("../routes/role.routes.js");

dotenv.config();

let refreshTokens = [];

//for test purpose
module.exports.findAll = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while retrieving users"
		});
	}
};

module.exports.create = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { login, name, password } = req.body;

		const oldUser = await User.findOne({ login });

		if (oldUser) {
			return res.status(409).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			login,
			name,
			password: encryptedPassword
		});

		await user.save(user);

		res.status(201).json({
			message: "New user created"
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while creating user"
		});
	}
};

module.exports.addDepo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { user_id, depo_id, role_name } = req.body;
		let userToUpdate = await User.findById(user_id);
		const role = await Role.findOne({ name: role_name });
		const hasAnyUser = !!userToUpdate;
		const hasAnyDepo = !!(await Depo.findById(depo_id));
		const hasAnyRole = !!role;
		let errorString = "";
		errorString += hasAnyUser ? "" : "User not found;\n";
		errorString += hasAnyDepo ? "" : "Depo not found;\n";
		errorString += hasAnyRole ? "" : "Role not found;";
		if (errorString.length != 0) {
			throw new Error(errorString);
		}

		let depos = userToUpdate.depos;
		depos.push({ depo_id: depo_id, role_id: role._id });
		let update = await User.findByIdAndUpdate(
			user_id,
			{ depos: depos },
			{
				new: true,
				rawResult: true // Return the raw result from the MongoDB driver
			}
		);
		if (update.value == null)
			throw new Error(`Could not update user with id ${user_id}`);
		res.status(200).json({ message: "OK" });
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while login user"
		});
	}
};

module.exports.login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (user && (await bcrypt.compare(password, user.password))) {
			const accessToken = jwt.sign(
				{ user_id: user._id, login },
				process.env.ACCESS_TOKEN_KEY || "access_token_key",
				{
					expiresIn: "1h"
				}
			);

			const refreshToken = jwt.sign(
				{ user_id: user._id, login },
				process.env.REFRESH_TOKEN_KEY || "refresh_token_key"
			);

			refreshTokens.push(refreshToken);

			return res
				.status(200)
				.json({ message: "Success", accessToken, refreshToken });
		}

		res.status(400).json({ message: "Invalid Credentials" });
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occured while login user"
		});
	}
};

module.exports.logout = (req, res) => {
	const { token } = req.body;
	refreshTokens = refreshTokens.filter((t) => t !== token);

	res.status(200).json({ message: "Logout successful" });
};

module.exports.newToken = (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res.sendStatus(401);
	}

	if (!refreshTokens.includes(token)) {
		return res.sendStatus(403);
	}
	try {
		const decoded = jwt.verify(
			token,
			process.env.REFRESH_TOKEN_KEY || "refresh_token_key"
		);

		const accessToken = jwt.sign(
			{ user_id: decoded._id, login: decoded.login },
			process.env.ACCESS_TOKEN_KEY || "access_token_key",
			{ expiresIn: "1h" }
		);

		res.json(accessToken);
	} catch (error) {
		return res.sendStatus(403);
	}
};
