const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Somil123";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Please Check your email and password and then try again",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      email: user.email,
      id: user._id,
    });
    const refreshToken = jwt.sign(
      { userName: user.name, id: user._id },
      secret,
      { expiresIn: "24h" }
    );

    res.json({
      result: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = generateAccessToken({
      userName: newUser.name,
      id: newUser._id,
    });

    const refreshToken = jwt.sign(
      { userName: newUser.name, id: newUser._id },
      secret,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      result: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateAccessToken = (userData) => {
  return jwt.sign(userData, secret, {
    expiresIn: "24h",
  });
};

module.exports = { login, register };
