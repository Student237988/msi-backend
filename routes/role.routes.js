module.exports = (app) => {
	const router = require("express").Router();
	const roleController = require("../controllers/role.controller.js");
	const validator = require("../middleware/validator.js");
	const auth = require("../middleware/auth.js");

	router.post("/new", auth, roleController.new);

	app.use("/api/roles", router);
};
