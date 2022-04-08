const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db_config.js");
const { default: mongoose } = require("mongoose");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    auth: {
      username: dbConfig.username,
      password: dbConfig.password,
    },
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the database!"))
  .catch((error) => console.log("Cannot connect to the database!", error));

// require("./routes/user.js")(app);
require("./routes/user.routes.js")(app);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port ", process.env.PORT || 8080);
});
