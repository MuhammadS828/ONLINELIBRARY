const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    default: "какая то книга",
  },
  _genreId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Genre",
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
