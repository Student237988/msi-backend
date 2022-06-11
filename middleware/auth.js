const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res
			.status(403)
			.json({ message: "A token is required for authentication" });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_KEY || "access_token_key"
		);
		req.user = decoded;
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}

	return next();
};

module.exports = verifyToken;
