const express = require("express");
const router = express.Router();
const {
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
  getUserExpenses,
  getExpense,
} = require("../controllers/expense");

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

router.get("/", getExpenses);
router.get("/:userId", getUserExpenses);
router.get("/expense/:id", getExpense);

module.exports = router;
