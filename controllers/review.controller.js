const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const { content } = req.body;
      const review = await Review.create({
        _bookId: req.params.bookId,
        _userId: req.params.userId,
        content,
      });
      return res.json(review);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      return res.json("Review deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateReview: async (req, res) => {
    try {
      const { content } = req.body;
      const review = await Review.findByIdAndUpdate(req.params.id, {
        content,
      });
      return res.json(review);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getAllReview: async (req, res) => {
    try {
      const review = await Review.find({}).populate("_userId _bookId", "name");
      return res.json(review);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
