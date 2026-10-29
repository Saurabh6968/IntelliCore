
const express = require("express");
const { analyzeResumeController } = require("../controllers/aiController");
const { analyzeUploadedResume } = require("../controllers/resumeAnalysisController");
const uploadResume = require("../middleware/resumeUpload");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/analyze-resume", authMiddleware, analyzeResumeController);

router.post(
  "/analyze-upload",
  authMiddleware,
  uploadResume.single("resume"),
  analyzeUploadedResume
);

module.exports = router;
