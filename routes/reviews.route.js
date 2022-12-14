const { Router } = require("express");
const { reviewsController } = require("../controllers/review.controller");

const router = Router();

router.post("/users/:userId/books/:bookId/reviews", reviewsController.addReview);
router.delete("/users/reviews/:id", reviewsController.deleteReview);
router.patch("/users/reviews/:id", reviewsController.updateReview);
router.get("/users/reviews", reviewsController.getAllReview);

module.exports = router;
