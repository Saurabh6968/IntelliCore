const express = require("express");

const {
  generateRoadmap,
  getLatestRoadmap,
  updatePhaseStatus,
} = require("../controllers/roadmapController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Generate a roadmap
router.post("/", authMiddleware, generateRoadmap);

// Get the latest roadmap
router.get("/latest", authMiddleware, getLatestRoadmap);

// Update a phase's status
router.patch("/:id/phases/:phaseId", authMiddleware, updatePhaseStatus);

module.exports = router;