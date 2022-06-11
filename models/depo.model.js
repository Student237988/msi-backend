const mongoose = require("mongoose");

const depoSchema = new mongoose.Schema({
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

module.exports = mongoose.model("depo", depoSchema, "depo");
