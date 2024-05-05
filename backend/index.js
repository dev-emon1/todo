require("dotenv").config();
const express = require("express");
const mongoConfig = require("./configs/mongoConfig");
const route = require("./routes");
const cors = require("cors");
const app = express();

// database
mongoConfig();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

//api routes
app.use("/", route);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
