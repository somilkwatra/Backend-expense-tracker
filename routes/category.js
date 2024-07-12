const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
} = require("../controllers/category");

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

module.exports = router;
