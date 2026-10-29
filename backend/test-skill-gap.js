require("dotenv").config();
const { analyzeResume } = require("./src/services/aiService");

analyzeResume({
  skillGapPrompt: `
Analyze a candidate targeting a Backend Developer role.
Current skills: Node.js, MongoDB.
Identify current skills, required skills, missing skills, and practical recommendations.

Return JSON with exactly these fields:
{
  "currentSkills": [],
  "requiredSkills": [],
  "missingSkills": [],
  "recommendations": []
}
All values must be arrays of strings.
`,
})
  .then((result) => {
    console.log("SKILL GAP TEST PASSED");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error("SKILL GAP TEST FAILED:", error.message);
  });
