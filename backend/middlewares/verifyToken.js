const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  const token = req.body;
  console.log(token);
};

module.exports = verifyToken;
