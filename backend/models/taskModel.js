const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Task", taskModel);
