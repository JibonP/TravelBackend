const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

router.get("/:destinationId", async (req, res) => {
  const destinationId = req.params.destinationId;

  try {
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE destination_id = $1",
      destinationId
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:destinationId/add", async (req, res) => {
  const { user_id, content, rating } = req.body;
  const destinationId = req.params.destinationId;

  try {
    const newReview = await db.one(
      "INSERT INTO reviews (user_id, destination_id, content, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, destinationId, content, rating]
    );

    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:reviewId/update", async (req, res) => {
  const reviewId = req.params.reviewId;
  const { content, rating } = req.body;

  try {
    const updatedReview = await db.oneOrNone(
      "UPDATE reviews SET content = $1, rating = $2 WHERE id = $3 RETURNING *",
      [content, rating, reviewId]
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:reviewId/delete", async (req, res) => {
  const reviewId = req.params.reviewId;

  try {
    const deletedReview = await db.oneOrNone(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      reviewId
    );

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
