module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../controllers/user.controller.js");
  const validator = require("../validator.js");

  router.get("/", userController.findAll);
  router.post("/new", validator.validateUser, userController.create);

  app.use("/api/users", router);
};
