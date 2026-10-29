const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));

const isNumber = (value) =>
  typeof value === "number" && !Number.isNaN(value);

const ADVICE = {
  resumeQuality: {
    title: "Complete Your Resume Profile",
    notStarted:
      "Add your summary, education, skills, projects and experience so your profile is complete.",
    started:
      "Add missing sections such as projects, experience or certifications to strengthen your profile.",
  },
  ats: {
    title: "Optimize for ATS",
    notStarted:
      "Upload your resume on the Resume Analysis page to get an ATS score.",
    started:
      "Use standard section headings and add role-relevant keywords to raise your ATS score.",
  },
  skillMatch: {
    title: "Close Your Skill Gaps",
    notStarted: "Run a Skill Gap analysis for your target role.",
    started:
      "Work on the missing skills identified in your Skill Gap analysis.",
  },
  interviewPerformance: {
    title: "Practice Interviews",
    notStarted: "Complete an AI interview to measure your performance.",
    started:
      "Complete more interviews and focus on clearer, more specific answers.",
  },
  learningProgress: {
    title: "Follow Your Roadmap",
    notStarted: "Generate a learning roadmap for your target role.",
    started:
      "Complete your current roadmap phase to keep making progress.",
  },
};

const SUMMARIES = {
  "Needs Work":
    "You are at the start of your preparation. Complete the recommended actions below to build your readiness.",
  Developing:
    "You have built a good foundation. Focus on your weakest areas to become more placement-ready.",
  Ready:
    "You are well prepared for placements. Keep practicing to stay sharp.",
};

const getResumeQuality = (resume) => {
  if (!resume) return null;

  let score = 0;

  if (resume.summary && resume.summary.trim()) score += 15;
  if (resume.education && resume.education.length > 0) score += 15;
  score += Math.min((resume.skills || []).length / 8, 1) * 20;
  score += Math.min((resume.projects || []).length / 3, 1) * 20;
  if (resume.experience && resume.experience.length > 0) score += 20;
  if (resume.certifications && resume.certifications.length > 0) score += 10;

  return clamp(score);
};

const getAtsScore = (resumeAnalysis) => {
  const score =
    resumeAnalysis && resumeAnalysis.ats && resumeAnalysis.ats.score;
  return isNumber(score) ? clamp(score) : null;
};

const getSkillMatch = (skillGap) => {
  if (!skillGap) return null;

  const required = (skillGap.requiredSkills || []).length;
  if (required === 0) return null;

  const missing = (skillGap.missingSkills || []).length;
  return clamp(((required - missing) / required) * 100);
};

const getInterviewStats = (interviews) => {
  const scores = [];

  interviews.forEach((interview) => {
    (interview.questions || []).forEach((item) => {
      if (isNumber(item.score)) scores.push(item.score);
    });
  });

  return {
    sessions: interviews.length,
    answered: scores.length,
    // Question scores are 0-10, so x10 gives a percentage
    average:
      scores.length === 0
        ? null
        : clamp(
            (scores.reduce((sum, value) => sum + value, 0) / scores.length) *
              10
          ),
  };
};

const getLearningProgress = (roadmap) => {
  if (!roadmap || !roadmap.phases || roadmap.phases.length === 0) {
    return null;
  }

  const completed = roadmap.phases.filter(
    (phase) => phase.status === "completed"
  ).length;

  return clamp((completed / roadmap.phases.length) * 100);
};

const getStatus = (score) => {
  if (score >= 70) return "Ready";
  if (score >= 40) return "Developing";
  return "Needs Work";
};

// Pure function: takes already-fetched documents, returns the readiness object
const buildReadiness = ({
  resume,
  resumeAnalysis,
  skillGap,
  roadmap,
  interviews,
}) => {
  const categories = [
    {
      key: "skillMatch",
      name: "Skill Match",
      weight: 25,
      score: getSkillMatch(skillGap),
    },
    {
      key: "interviewPerformance",
      name: "Interview Performance",
      weight: 25,
      score: getInterviewStats(interviews).average,
    },
    {
      key: "learningProgress",
      name: "Learning Progress",
      weight: 20,
      score: getLearningProgress(roadmap),
    },
    {
      key: "ats",
      name: "ATS Compatibility",
      weight: 15,
      score: getAtsScore(resumeAnalysis),
    },
    {
      key: "resumeQuality",
      name: "Resume Quality",
      weight: 15,
      score: getResumeQuality(resume),
    },
  ];

  const overallScore = clamp(
    categories.reduce(
      (sum, category) => sum + (category.score ?? 0) * category.weight,
      0
    ) / 100
  );

  const status = getStatus(overallScore);

  const improvements = [...categories]
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 3)
    .map((category) => ({
      key: category.key,
      title: ADVICE[category.key].title,
      description:
        category.score === null
          ? ADVICE[category.key].notStarted
          : ADVICE[category.key].started,
    }));

  return {
    overallScore,
    status,
    summary: SUMMARIES[status],
    startedCount: categories.filter((c) => c.score !== null).length,
    totalCount: categories.length,
    categories,
    improvements,
  };
};

module.exports = {
  buildReadiness,
  getInterviewStats,
  getSkillMatch,
  getResumeQuality,
  getAtsScore,
};