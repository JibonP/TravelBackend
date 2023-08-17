const db = require("../db/dbConfig");

const Review = {};

Review.getReviewsForDestination = async (destinationId) => {
  try {
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE destination_id = $1",
      destinationId
    );
    return reviews;
  } catch (error) {
    return error;
  }
};

Review.addReview = async (userId, destinationId, content, rating) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (user_id, destination_id, content, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, destinationId, content, rating]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

Review.getReviewById = async (reviewId) => {
  try {
    const review = await db.one(
      "SELECT * FROM reviews WHERE id = $1",
      reviewId
    );
    return review;
  } catch (error) {
    return error;
  }
};

Review.updateReview = async (reviewId, content, rating) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET content = $1, rating = $2 WHERE id = $3 RETURNING *",
      [content, rating, reviewId]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

Review.deleteReview = async (reviewId) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      reviewId
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

module.exports = Review;
