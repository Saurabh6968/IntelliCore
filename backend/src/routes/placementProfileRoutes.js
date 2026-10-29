const express = require("express");

const {
  getPlacementProfile,
  savePlacementProfile,
} = require("../controllers/placementProfileController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPlacementProfile);

router.put("/", authMiddleware, savePlacementProfile);

module.exports = router;
