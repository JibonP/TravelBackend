const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/:destinationId", reviewsController.getReviewsForDestination);
router.post("/:destinationId/add", reviewsController.addReview);
router.put("/:reviewId/update", reviewsController.updateReview);
router.delete("/:reviewId/delete", reviewsController.deleteReview);

module.exports = router;
