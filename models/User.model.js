const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "Без имени",
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
