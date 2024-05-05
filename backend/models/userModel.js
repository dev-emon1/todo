const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  imageURL: {
    type: String,
    // require: true,
  },
});

module.exports = mongoose.model("User", userModel);
