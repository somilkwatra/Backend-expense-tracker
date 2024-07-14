const express = require("express");
const router = express.Router();
const {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
  getUserExpenses,
} = require("../controllers/expense");

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

router.get("/", getExpenses);
router.get("/:userId", getUserExpenses);

module.exports = router;
