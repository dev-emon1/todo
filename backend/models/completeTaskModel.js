const mongoose = require("mongoose");
const { Schema } = mongoose;

const completeTaskModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Complete_Task", completeTaskModel);
