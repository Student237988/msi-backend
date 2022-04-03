"use strict";

const { getUsers } = require("../model/users");

module.exports = (app) => {
	app.get("/users", async (req, res) => {
		try {
			let users = await getUsers();
			// 	.then((res) => console.log("Printing at calling ::", res))
			// 	.catch((err) => console.log("Err at Calling ::", err));
			return res.status(200).json(users);
		} catch (error) {
			console.log(error);
			return res.status(400).send("Bad request");
		}
	});
};
