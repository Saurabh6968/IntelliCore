const Resume = require("../models/Resume");
const Roadmap = require("../models/Roadmap");
const { analyzeResume } = require("../services/aiService");

const VALID_STATUSES = ["completed", "current", "upcoming"];

// Generate a new roadmap
const generateRoadmap = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        message: "Target role is required",
      });
    }

    const resume = await Resume.findOne({
      user: userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const prompt = `
Create a practical career roadmap for this candidate.

Target Role:
${targetRole}

Candidate Resume:
${JSON.stringify(resume, null, 2)}

The candidate is a B.Tech student preparing for placements.

Return ONLY this JSON structure:

{
  "currentLevel": "",
  "phases": [
    {
      "title": "",
      "duration": "",
      "skills": [],
      "tasks": []
    }
  ]
}

Rules:
- currentLevel should describe the candidate's current level.
- Create 4 to 6 learning phases.
- Each phase must have a title.
- Each phase must have a realistic duration.
- skills must be an array of strings.
- tasks must be an array of practical tasks or projects.
- Make the roadmap practical for placement preparation.
- Do not return markdown.
- Do not add text outside the JSON.
`;

    const analysis = await analyzeResume({
      ...resume.toObject(),
      roadmapPrompt: prompt,
    });

    const phases = (analysis.phases || []).map((phase, index) => ({
      ...phase,
      status: index === 0 ? "current" : "upcoming",
    }));

    const roadmap = await Roadmap.create({
      user: userId,
      targetRole,
      currentLevel: analysis.currentLevel || "",
      phases,
    });

    res.status(200).json({
      message: "Career roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("ROADMAP ERROR:", error.message);

    next(error);
  }
};

// Get the user's most recent roadmap
const getLatestRoadmap = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const roadmap = await Roadmap.findOne({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Roadmap fetched successfully",
      roadmap: roadmap || null,
    });
  } catch (error) {
    console.error("GET ROADMAP ERROR:", error.message);

    next(error);
  }
};

// Update the status of one phase
const updatePhaseStatus = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id, phaseId } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Status must be completed, current, or upcoming",
      });
    }

    const roadmap = await Roadmap.findOne({
      _id: id,
      user: userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found",
      });
    }

    const index = roadmap.phases.findIndex(
      (phase) => phase._id.toString() === phaseId
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Phase not found",
      });
    }

    roadmap.phases[index].status = status;

    if (status === "completed") {
      const nextPhase = roadmap.phases[index + 1];

      if (nextPhase && nextPhase.status === "upcoming") {
        nextPhase.status = "current";
      }
    }

    await roadmap.save();

    res.status(200).json({
      message: "Phase updated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("UPDATE PHASE ERROR:", error.message);

    next(error);
  }
};

module.exports = {
  generateRoadmap,
  getLatestRoadmap,
  updatePhaseStatus,
};