const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const User = {};

User.createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.one(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

User.findUserByEmail = async (email) => {
  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    return user;
  } catch (error) {
    return error;
  }
};

User.verifyPassword = async (providedPassword, storedPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(
      providedPassword,
      storedPassword
    );
    return isPasswordValid;
  } catch (error) {
    return error;
  }
};

User.updatePassword = async (userId, newPassword) => {
  try {
    await db.none("UPDATE users SET password = $1 WHERE id = $2", [
      newPassword,
      userId,
    ]);
  } catch (error) {
    return error;
  }
};

User.deleteUser = async (userId) => {
  try {
    await db.none("DELETE FROM users WHERE id = $1", [userId]);
  } catch (error) {
    return error;
  }
};

module.exports = User;
