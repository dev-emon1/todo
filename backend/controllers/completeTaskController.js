const Task = require("../models/taskModel");
const CompleteTask = require("../models/completeTaskModel");

const completeTaskController = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res.send({ error: "ID is required" });
    }
    const task = await Task.findOne({ _id: _id });

    if (!task) {
      return res.send({ error: "Task is not found" });
    } else {
      const comTask = new CompleteTask(task.toObject());
      await comTask.save();
      await Task.deleteOne({ _id: comTask._id });
      res.send({ success: "Task has completed" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = completeTaskController;
