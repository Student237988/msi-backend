const mongoose = require("mongoose");
const dbConfig = require("../config/db_config");
const { users } = require("./schemas");

const url = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
//const uri = "mongodb+srv://root:root@cluster0.d25wj.mongodb.net/msi?retryWrites=true&w=majority";

const getUsers = async () => {
	let db = null;
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			auth: {
				username: dbConfig.username,
				password: dbConfig.password
			},
			authSource: "admin",
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
		db = mongoose.connection;
		let dbResp = await users.find({}).limit(1).lean();
		db.close();
		return dbResp;
	} catch (err) {
		db && db.close();
		console.log("Error at getUsers ::", err);
		throw err;
	}
};

module.exports.getUsers = getUsers;
