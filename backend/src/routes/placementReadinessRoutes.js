const express = require("express");

const {
  getPlacementReadiness,
} = require("../controllers/placementReadinessController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPlacementReadiness);

module.exports = router;