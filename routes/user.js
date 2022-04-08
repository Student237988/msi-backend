//to remove?

"use strict";

const { getUsers } = require("./models/users");

module.exports = (app) => {
	app.get("/users", async (req, res) => {
		try {
			let users = await getUsers();
			return res.status(200).json(users);
		} catch (error) {
			console.log(error);
			return res.status(400).send("Bad request");
		}
	});
};
