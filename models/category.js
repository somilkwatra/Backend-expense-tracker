const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Category", categorySchema);
