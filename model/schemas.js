const mongoose = require("mongoose");
const User = new mongoose.Schema(
	{
		name: String,
		password: String,
		email: String,
		phone: String,
		depos: [
			{
				depo_id: String,
				role_id: String
			}
		]
	},
	{
		strict: false
	}
);
module.exports.userSchema = User;
module.exports.users = mongoose.model("user", User, "user");
