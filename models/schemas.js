const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		id: mongoose.Schema.Types.String,
		login: mongoose.Schema.Types.String,
		name: mongoose.Schema.Types.String,
		password: mongoose.Schema.Types.String,
		depos: [
			{
				depo_id: mongoose.Schema.Types.String,
				role_id: mongoose.Schema.Types.String
			}
		]
	},
	{
		strict: false
	}
);
module.exports.userSchema = User;
module.exports.users = mongoose.model("user", User, "user");

const Category = new mongoose.Schema({
	id: mongoose.Schema.Types.String,
	name: mongoose.Schema.Types.String,
	comment: mongoose.Schema.Types.String
});
module.exports.categorySchema = Category;
module.exports.categories = mongoose.model("category", Category, "category");

const Depo = new mongoose.Schema({
	id: mongoose.Schema.Types.String,
	name: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	phone: mongoose.Schema.Types.String,
	address: {
		city: mongoose.Schema.Types.String,
		post_code: mongoose.Schema.Types.String,
		street: mongoose.Schema.Types.String,
		building: mongoose.Schema.Types.String,
		premises: mongoose.Schema.Types.String
	},
	receipts_diaries: [
		{
			diary_id: mongoose.Schema.Types.String,
			product_id: mongoose.Schema.Types.String,
			quantity: mongoose.Schema.Types.Number,
			due_date: mongoose.Schema.Types.Date,
			comment: mongoose.Schema.Types.String
		}
	]
});
module.exports.depoSchema = Depo;
module.exports.depos = mongoose.model("depo", Depo, "depo");
