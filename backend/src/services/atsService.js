
const calculateAtsScore = (resumeText) => {
  const text = resumeText.toLowerCase();

  const sections = [
    /\b(education|academic background)\b/,
    /\b(experience|internship|work experience)\b/,
    /\b(projects|personal projects)\b/,
    /\b(skills|technical skills)\b/,
  ];

  const keywords = [
    "java", "python", "javascript", "sql",
    "react", "node.js", "api", "git",
    "data structures", "algorithms",
    "communication", "problem solving",
  ];

  const sectionMatches = sections.filter((pattern) =>
    pattern.test(text)
  ).length;

  const keywordMatches = keywords.filter((keyword) =>
    text.includes(keyword)
  ).length;

  const formattingScore = text.length > 0 ? 100 : 0;
  const sectionScore = (sectionMatches / sections.length) * 100;
  const keywordScore = (keywordMatches / keywords.length) * 100;

  const score = Math.round(
    sectionScore * 0.4 +
    keywordScore * 0.4 +
    formattingScore * 0.2
  );

  return {
    score,
    categories: [
      {
        name: "Section Structure",
        score: Math.round(sectionScore),
      },
      {
        name: "Keyword Match",
        score: Math.round(keywordScore),
      },
      {
        name: "Formatting",
        score: Math.round(formattingScore),
      },
    ],
  };
};

module.exports = { calculateAtsScore };
