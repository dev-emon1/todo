const User = require("../models/userModel");
const emailValidator = require("../middlewares/emailValidator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const registrationController = async (req, res) => {
  const { username, email, password } = req.body;
  // const { filename } = req.file;
  console.log(req.body, req.file);

  try {
    // if (!filename) {
    //   return res.send({ message: "Please upload a profile image" });
    // }
    if (!username || !email || !password) {
      return res.send({ error: "Require all fields" });
    }
    if (username.length < 3) {
      return res.send({ error: "Username is too short" });
    }
    if (!emailValidator(email)) {
      return res.send({ error: "Email is not valid" });
    }
    if (password.length < 6) {
      return res.send({ error: "Password is too short" });
    }

    const existingUser = await User.find({ email: email });

    if (existingUser && existingUser.length > 0) {
      return res.send({ error: "User already exist" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const user = new User({
          username: username,
          email: email,
          password: hash,
          // imageURL: req.file.filename,
        });
        await user.save();

        jwt.sign(
          { email: email },
          process.env.VERIFY_TOKEN,
          async function (err, token) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "shahariaremon.bd71@gmail.com",
                pass: "ddfz xmgw stjv nipa",
              },
            });
            const info = await transporter.sendMail({
              from: '"MERNIAN" <shahariaremon.bd71@gmail.com>', // sender address
              to: email,
              subject: "Verification", // Subject line
              html: `<p>Click the link <b><a href="http://localhost:5173/verification/${token}">Click me</a></b></p>`, // html body
            });
          }
        );

        res.send({
          success: "Registration successful. Please check your email.",
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = registrationController;
