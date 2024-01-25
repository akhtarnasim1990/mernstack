const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
var jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (firstName === "" || firstName === undefined || firstName === null) {
      throw new Error("Invalid firstName.");
    }
    if (lastName === "" || lastName === undefined || lastName === null) {
      throw new Error("Invalid lastName.");
    }
    if (email === "" || email === undefined || email === null) {
      throw new Error("Invalid email.");
    }
    if (password === "" || password === undefined || password === null) {
      throw new Error("Invalid password.");
    }

    const oldUser = await Users.findOne({ email: email });
    if (oldUser) {
      throw new Error("User already exists please login.");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const userToken = jwt.sign(
      {
        id: newUser._id,
        email: email,
      },
      process.env.secret_key,
      { expiresIn: "1h" }
    );

    newUser.save().then((result) => {
      if (result) {
        res.status(200).json({ message: "User created successfully", data: newUser, userToken, success: true });
      } else {
        throw new Error("User creation failed.");
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

module.exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === "" || email === undefined || email === null) {
      throw new Error("Invalid email.");
    }
    const emailExist = await Users.findOne({ email: email });
    if (emailExist) {
      throw new Error("Email already exists please try another email.");
    }

    res.status(200).json({ message: "Email does not exists.", success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};
