const express = require("express");
const route = express.Router();
const auth = require("./auth");
const tasks = require("./tasks");

route.use("/", auth);
route.use("/", tasks);

module.exports = route;
