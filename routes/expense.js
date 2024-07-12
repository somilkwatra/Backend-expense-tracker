const express = require("express");
const router = express.Router();
const {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
} = require("../controllers/expense");

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

router.get("/", getExpenses);

module.exports = router;
