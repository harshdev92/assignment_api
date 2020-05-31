const winston = require("winston");
const express = require("express");
const auth = require("./routes/auth");
const users = require("./routes/users");
const states = require("./routes/states");
const districts = require("./routes/districts");
const childs = require("./routes/childs");
var cors = require("cors");
const app = express();

app.use(cors());
require("./startup/logging")();
require("./startup/db")();
require("./startup/config")();
app.use(express.json());
app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    //Handle SyntaxError here.
    return res.status(500).send({ data: "Invalid data check the json format" });
  } else {
    next();
  }
});
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/states", states);
app.use("/api/districts", districts);
app.use("/api/childs", childs);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
