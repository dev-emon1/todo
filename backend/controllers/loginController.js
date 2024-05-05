const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("../middlewares/emailValidator");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!emailValidator(email)) {
      return res.send({ error: "Email is not valid" });
    }
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.send({ error: "User not found" });
    }
    if (!findUser.emailVerified) {
      return res.send({ error: "Please verify your email" });
    }
    if (findUser) {
      bcrypt.compare(password, findUser.password, async function (err, result) {
        const token = jwt.sign(
          { id: findUser._id, email: findUser.email },
          process.env.LOGIN_TOKEN,
          { expiresIn: "24h" }
        );

        if (result) {
          return res.send({
            success: "Login success",
            token: token,
            user: findUser,
          });
        } else {
          return res.send({ error: "Credential not matched" });
        }
      });
    } else {
      return res.send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginController;
