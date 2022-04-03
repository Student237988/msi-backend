const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.js")(app);

app.listen(process.env.PORT || 8080, () => {
	console.log("Server is running on port ", process.env.PORT || 8080);
});
