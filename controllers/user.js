const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with id: ${id}`);
  }

  try {
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  // change password
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with id: ${id}`);
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send(`No user with id: ${id}`);
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser, getUsers, getUser, changePassword, deleteUser };
