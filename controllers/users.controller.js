const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { name, books, isBlocked } = req.body;
      const user = await User.create({
        name,
        books,
        isBlocked,
      });
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json("User deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, books, isBlocked } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, {
        name,
        books,
        isBlocked,
      });
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find({}).populate("books", "name");
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  },
  banForUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        isBlocked: true,
        books: [],
      });
      await Book.find({ _userId: req.params.userId}).updateMany({
        _userId: null,
      });
      return res.json("Пользователь заблокирован и возвращены все взятые им в аренду книги");
    } catch (error) {
      return res.json(error.message);
    }
  },
};