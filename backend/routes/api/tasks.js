const express = require("express");
const addTaskController = require("../../controllers/addTaskController");
const viewTasks = require("../../controllers/viewTasks");
const deleteTaskController = require("../../controllers/deleteTaskController");
const deleteCompleteTaskController = require("../../controllers/deleteCompleteTaskController");
const completeTaskController = require("../../controllers/completeTaskController");
const viewCompletedTaskController = require("../../controllers/viewCompletedTaskController");
const route = express.Router();

// post data
route.post("/addtask", addTaskController);
route.post("/movetask", completeTaskController);

// get data
route.get("/viewtasks", viewTasks);
route.get("/viewcompletedtask", viewCompletedTaskController);

// delete data
route.delete("/delete", deleteTaskController);
route.delete("/deletecomplete", deleteCompleteTaskController);

module.exports = route;
