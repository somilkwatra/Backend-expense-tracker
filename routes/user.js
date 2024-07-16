const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  changePassword,
  deleteUser,
} = require("../controllers/user");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(changePassword).delete(deleteUser);

module.exports = router;
