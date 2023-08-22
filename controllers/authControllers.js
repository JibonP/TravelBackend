const crypto = require("crypto");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/dbConfig");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;

function generateRandomToken() {
  const tokenLength = 40;
  return crypto.randomBytes(tokenLength).toString("hex");
}

const transporter = nodemailer.createTransport({
  service: "your-email-service-provider",
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

function sendResetEmail(email, resetLink) {
  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await db.one(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword]
      );

      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("JWT_SECRET:", JWT_SECRET);
      res.json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateRandomToken();
    const resetTokenExpiration = new Date().getTime() + 3600000;

    const resetTokenExpirationDate = new Date(resetTokenExpiration);

    await db.none(
      "UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3",
      [resetToken, resetTokenExpirationDate, email]
    );

    const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;
    sendResetEmail(email, resetLink);

    res.json({ message: "Password reset link sent", resetToken: resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/reset-password",
  [
    body("token").isLength({ min: 64, max: 64 }),
    body("newPassword").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await db.oneOrNone(
        "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiration > to_timestamp($2)",
        [token, new Date().getTime() / 1000]
      );

      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await db.none(
        "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE email = $2",
        [hashedPassword, user.email]
      );

      res.json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
