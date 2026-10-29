
const express = require("express");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Fetch the logged-in user's profile
router.get("/profile", authMiddleware, getProfile);

// Update the logged-in user's profile
router.put("/profile", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
