module.exports = {
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || "27017",
	username: process.env.DB_USER || "mongoadmin",
	password: process.env.DB_PASSWORD || "secret",
	database: process.env.DB_NAME || "refugee_help_app"
};
