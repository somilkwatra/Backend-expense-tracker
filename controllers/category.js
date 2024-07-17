const mongoose = require("mongoose");
const Category = require("../models/category");

const createCategory = async (req, res) => {
  const { name, userId } = req.body;

  const category = new Category({
    name,
    userId,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, userId },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategoriesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categories = await Category.find({ userId: userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMostUsedCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Finding most used category for userId: ${userId}`);

    const totalCategories = await Category.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const mostUsedCategory = await Category.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    console.log("Most used category aggregation result:", mostUsedCategory);

    if (!mostUsedCategory || mostUsedCategory.length === 0) {
      return res.status(404).json({ message: "Most used category not found" });
    }

    const percentage = (mostUsedCategory[0].count / totalCategories) * 100;

    res.status(200).json({
      name: mostUsedCategory[0]._id,
      count: mostUsedCategory[0].count,
      percentage: percentage.toFixed(2) + "%",
    });
  } catch (error) {
    console.error("Error fetching most used category:", error);
    res.status(500).json({ message: error.message });
  }
};

const getLeastUsedCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Finding least used category for userId: ${userId}`);

    const totalCategories = await Category.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const leastUsedCategory = await Category.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $sort: { count: 1 } },
      { $limit: 1 },
    ]);

    console.log("Least used category aggregation result:", leastUsedCategory);

    if (!leastUsedCategory || leastUsedCategory.length === 0) {
      return res.status(404).json({ message: "Least used category not found" });
    }

    const percentage = (leastUsedCategory[0].count / totalCategories) * 100;

    res.status(200).json({
      name: leastUsedCategory[0]._id,
      count: leastUsedCategory[0].count,
      percentage: percentage.toFixed(2) + "%",
    });
  } catch (error) {
    console.error("Error fetching least used category:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoriesByUserId,
  getCategory,
  getMostUsedCategory,
  getLeastUsedCategory,
};
