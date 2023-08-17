const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

router.get("/profile", async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await db.one(
      "SELECT id, email FROM users WHERE id = $1",
      userId
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
