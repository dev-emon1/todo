const mongoose = require("mongoose");

const mongoConfig = () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Database is connected`);
  });
};

module.exports = mongoConfig;
