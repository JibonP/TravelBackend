const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");

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

router.put("/update-password", async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.none("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/delete-account", async (req, res) => {
  const userId = req.user.userId;

  try {
    await db.none("DELETE FROM users WHERE id = $1", [userId]);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
