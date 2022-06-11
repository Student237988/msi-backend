module.exports = (app) => {
	const router = require("express").Router();
	const userController = require("../controllers/user.controller.js");
	const validator = require("../middleware/validator.js");
	const auth = require("../middleware/auth.js");

	router.get("/", userController.findAll);
	router.post("/new", validator.validateUser, userController.create);
	router.post("/login", validator.validateLogin, userController.login);
	router.post("/logout", userController.logout);
	router.post("/addDepo", userController.addDepo);

	router.post("/new_token", userController.newToken);

	//for test purpose
	router.post("/welcome", auth, (req, res) => {
		res.status(200).send("Welcome 🙌");
	});

	app.use("/api/users", router);
};
