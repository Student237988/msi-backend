const mongoose = require("mongoose");

const depoSchema = new mongoose.Schema({
	name: mongoose.Schema.Types.String,
	email: mongoose.Schema.Types.String,
	phone: mongoose.Schema.Types.String,
	city: mongoose.Schema.Types.String,
	post_code: mongoose.Schema.Types.String,
	street: mongoose.Schema.Types.String,
	building: mongoose.Schema.Types.String,
	lat: mongoose.Schema.Types.Decimal128,
	lng: mongoose.Schema.Types.Decimal128
});

module.exports = mongoose.model("depo", depoSchema, "depo");
