require("dotenv").config();
const { analyzeResume } = require("./src/services/aiService");

analyzeResume({ name: "Test", skills: ["Node.js", "MongoDB"] })
  .then((r) => console.log("OK:", r))
  .catch((e) => console.error("FAILED:", e.message));