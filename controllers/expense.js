const mongoose = require("mongoose");
const Expense = require("../models/expense");

const createExpense = async (req, res) => {
  const { name, categoryId, amount, notes, userId, date } = req.body;

  const expense = new Expense({
    name,
    categoryId,
    amount,
    userId,
    notes,
    date: date || new Date().toISOString(),
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { name, categoryId, amount, notes, userId, date } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        name,
        categoryId,
        amount,
        userId,
        notes,
        date: date || new Date().toISOString(),
      },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserExpenses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const expenses = await Expense.find({ userId: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
  getUserExpenses,
};
