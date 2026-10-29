const Resume = require("../models/Resume");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const SkillGap = require("../models/skillGap");
const Roadmap = require("../models/Roadmap");
const Interview = require("../models/interview");
const { buildReadiness } = require("../services/readinessService");

const getPlacementReadiness = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const [resume, resumeAnalysis, skillGap, roadmap, interviews] =
      await Promise.all([
        Resume.findOne({ user: userId }),
        ResumeAnalysis.findOne({ user: userId }),
        SkillGap.findOne({ user: userId }).sort({ createdAt: -1 }),
        Roadmap.findOne({ user: userId }).sort({ createdAt: -1 }),
        Interview.find({ user: userId }),
      ]);

    const readiness = buildReadiness({
      resume,
      resumeAnalysis,
      skillGap,
      roadmap,
      interviews,
    });

    res.status(200).json({
      message: "Placement readiness calculated successfully",
      readiness,
    });
  } catch (error) {
    console.error("PLACEMENT READINESS ERROR:", error.message);

    next(error);
  }
};

module.exports = {
  getPlacementReadiness,
};