const Task = require("../models/taskModel");

const viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
};

module.exports = viewTasks;
