const Task = require("../models/taskModel");

const addTaskController = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res.send({ error: "Require all fields" });
    }
    if (name && name.length < 2) {
      return res.send({ error: "Name is too short" });
    }
    if (description && description.length < 10) {
      return res.send({ error: "Name is too short" });
    }
    if (description && description.length > 40) {
      return res.send({ error: "Name is too long" });
    }

    const existingData = await Task.find({ name: name });

    if (existingData && existingData.length > 0) {
      return res.send({ error: "Task already exist" });
    } else {
      const data = new Task({
        name: name,
        description: description,
      });
      await data.save();
      res.send({
        success: "Task added",
        name: data.name,
        description: data.description,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = addTaskController;
