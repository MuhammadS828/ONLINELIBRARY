const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  _bookId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Book",
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "User",
  },
  text: {
    type: String,
    default: "пока не читал",
  }, // контент на текст
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
