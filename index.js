const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const authRoutes = require("./routes/auth");

const expenseRouter = require("./routes/expense");
const category = require("./models/category");
const categoryRouter = require("./routes/category");
dotenv.config();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {});
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

connectDB();
app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/auth", authRoutes);
