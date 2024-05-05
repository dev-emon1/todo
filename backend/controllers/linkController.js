const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const linkController = async (req, res) => {
  const { token } = req.body;

  try {
    const { email } = jwt.verify(token, process.env.VERIFY_TOKEN);
    const findUser = await User.findOne({ email: email });

    if (!findUser.emailVerified) {
      await User.findOneAndUpdate({ email: email }, { emailVerified: true });
      res.send({ success: "Verification successful" });
    } else {
      res.send({ error: "Email already verified" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = linkController;
