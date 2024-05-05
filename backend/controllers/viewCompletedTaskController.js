const CompleteTask = require("../models/completeTaskModel");

const viewCompletedTaskController = async (req, res) => {
  try {
    const data = await CompleteTask.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = viewCompletedTaskController;
