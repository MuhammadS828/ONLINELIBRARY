const Book = require("../models/Book.model");
const User = require("../models/User.model");

module.exports.booksController = {
  addBook: async (req, res) => {
    try {
      const { name, _genreId, _userId } = req.body;
      const book = await Book.create({
        name,
        _genreId,
        _userId,
      });
      return res.json(book);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      return res.json("book deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateBook: async (req, res) => {
    try {
      const { name, _genreId, _userId } = req.body;
      const book = await Book.findByIdAndUpdate(req.params.id, {
        name,
        _genreId,
        _userId,
      });
      return res.json(book);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getOneBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate(
        "_genreId _userId",
        "name"
      );
      return res.json(book);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const book = await Book.find({}).populate("_genreId _userId", "name");
      return res.json(book);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getBookByGenre: async (req, res) => {
    try {
      const book = await Book.find({ _genreId: req.params.id }).populate(
        "_genreId _userId",
        "name"
      );
      return res.json(book);
    } catch (error) {
      return res.json(error.message);
    }
  },
  rentBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const book = await Book.findById(req.params.bookId);
      if (user.books.includes(req.params.bookId)) {
        return res.json("Книга уже используется");
      }
      if (user.isBlocked === true) {
        return res.json("Пользователь заблокирован");
      }
      if (book._userId !== null) {
        return res.json("Книга недоступна");
      }
      if (user.books.length >= 3) {
        return res.json("вы не можете взять больше книгу в аренду");
      } else {
        await book.updateOne({ _userId: req.params.userId });
        await user.updateOne({ $push: { books: req.params.bookId } });
        return res.json("Книга арендована");
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
  returnBook: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const book = await Book.findById(req.params.bookId);
      if (user.books.includes(req.params.bookId)) {
        await book.updateOne({ _userId: null });
        await user.updateOne({ $pull: { books: req.params.bookId } });
        return res.json("Пользователь вернул книгу");
      } else {
        return res.json("книга не у пользователя");
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
};
