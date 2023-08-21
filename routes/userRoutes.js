const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/profile",
  authMiddleware.verifyToken,
  usersController.getUserProfile
);

router.put(
  "/update-password",
  authMiddleware.verifyToken,
  usersController.updatePassword
);

router.delete(
  "/delete-account",
  authMiddleware.verifyToken,
  usersController.deleteAccount
);

module.exports = router;
