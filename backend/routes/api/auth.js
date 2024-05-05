const express = require("express");
const registrationController = require("../../controllers/registrationController");
const linkController = require("../../controllers/linkController");
const loginController = require("../../controllers/loginController");
const upload = require("../../middlewares/multerConfig");
const route = express.Router();

route.post("/registration", upload.single("image"), registrationController);

route.post("/verification", linkController);
route.post("/login", loginController);

module.exports = route;
