module.exports = (app) => {
	const router = require("express").Router();
	const depoController = require("../controllers/depo.controller.js");
	const validator = require("../middleware/validator.js");
	const auth = require("../middleware/auth.js");

	router.get("/", auth, depoController.findAll);
	router.get("/byUser", auth, depoController.findByUser);
	router.post("/new", auth, depoController.create);
	router.patch("/update", auth, depoController.update);

	app.use("/api/depos", router);
};
