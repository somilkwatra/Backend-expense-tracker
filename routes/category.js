const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

// Route to create a new category
router.post("/", categoryController.createCategory);

// Route to delete a category by ID
router.delete("/:id", categoryController.deleteCategory);

// Route to update a category by ID
router.put("/:id", categoryController.updateCategory);

// Route to get all categories by user ID
router.get("/:userId", categoryController.getCategoriesByUserId);

// Route to get a category by ID
router.get("/:id", categoryController.getCategory);

// Route to get the most used category by user ID
router.get("/most-used/:userId", categoryController.getMostUsedCategory);

// Route to get the least used category by user ID
router.get("/least-used/:userId", categoryController.getLeastUsedCategory);

module.exports = router;
