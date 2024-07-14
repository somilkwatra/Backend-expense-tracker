const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoriesByUserId,
  getCategory,
} = require("../controllers/category");

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

router.get("/:id", getCategoriesByUserId);

router.get("/:id", getCategory);

module.exports = router;
