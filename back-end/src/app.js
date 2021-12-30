const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

require("dotenv").config();
require("./auth/passport");

const middleware = require("./middlewares");
const adminApi = require("./api/adminApi");
const userApi = require("./api/userApi");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
	res.status(200).send({
		message: "Hello World! 😎",
	})
);

app.use("/admin", adminApi);
app.use("/user", passport.authenticate("jwt", { session: false }), userApi);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
