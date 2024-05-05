const Task = require("../models/taskModel");

const deleteTaskController = async (req, res) => {
  const { _id } = req.body;
  try {
    await Task.deleteOne({ id: _id });
    res.send({ success: "Task deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteTaskController;
