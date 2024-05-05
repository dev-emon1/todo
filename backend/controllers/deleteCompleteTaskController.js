const CompleteTask = require("../models/completeTaskModel");

const deleteCompleteTaskController = async (req, res) => {
  const { _id } = req.body;
  try {
    await CompleteTask.deleteOne({ id: _id });
    res.send({ success: "Task deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteCompleteTaskController;
