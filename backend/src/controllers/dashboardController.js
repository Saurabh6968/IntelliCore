const Resume = require("../models/Resume");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const SkillGap = require("../models/skillGap");
const Roadmap = require("../models/Roadmap");
const Interview = require("../models/interview");
const {
  buildReadiness,
  getInterviewStats,
  getSkillMatch,
} = require("../services/readinessService");

const buildSkillGapSummary = (skillGap) => {
  if (!skillGap) return null;

  const missing = skillGap.missingSkills || [];
  const have = (skillGap.requiredSkills || []).filter(
    (skill) => !missing.includes(skill)
  );

  // Missing skills first, since they need attention. Show 4 rows max.
  const skills = [
    ...missing.map((name) => ({ name, have: false })),
    ...have.map((name) => ({ name, have: true })),
  ].slice(0, 4);

  return {
    targetRole: skillGap.targetRole,
    matchScore: getSkillMatch(skillGap),
    skills,
  };
};

const buildRoadmapSummary = (roadmap) => {
  if (!roadmap || !roadmap.phases || roadmap.phases.length === 0) {
    return null;
  }

  const phases = roadmap.phases;
  const completed = phases.filter((p) => p.status === "completed").length;

  // Show a window of 3 phases around the first unfinished one
  const firstOpen = phases.findIndex((p) => p.status !== "completed");
  const maxStart = Math.max(0, phases.length - 3);
  const start =
    firstOpen === -1 ? maxStart : Math.min(Math.max(0, firstOpen - 1), maxStart);

  return {
    targetRole: roadmap.targetRole,
    progress: Math.round((completed / phases.length) * 100),
    phases: phases.slice(start, start + 3).map((phase, offset) => ({
      number: start + offset + 1,
      title: phase.title,
      description:
        (phase.skills && phase.skills.join(", ")) ||
        (phase.tasks && phase.tasks[0]) ||
        "",
      status: phase.status,
    })),
  };
};

const getDashboard = async (req, res, next) => {
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

    const scoreOf = (key) =>
      readiness.categories.find((c) => c.key === key).score;

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      dashboard: {
        scores: {
          ats: scoreOf("ats"),
          skillMatch: scoreOf("skillMatch"),
          readiness: readiness.overallScore,
        },
        resume: {
          analyzed: Boolean(resumeAnalysis),
          resumeScore: scoreOf("resumeQuality"),
          atsScore: scoreOf("ats"),
          lastAnalyzed: resumeAnalysis ? resumeAnalysis.updatedAt : null,
        },
        skillGap: buildSkillGapSummary(skillGap),
        roadmap: buildRoadmapSummary(roadmap),
        interviews: getInterviewStats(interviews),
        readiness: {
          overallScore: readiness.overallScore,
          status: readiness.status,
          summary: readiness.summary,
        },
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error.message);

    next(error);
  }
};

module.exports = {
  getDashboard,
};