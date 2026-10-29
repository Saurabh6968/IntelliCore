const { PDFParse } = require("pdf-parse");
const { analyzeResume } = require("../services/aiService");
const { calculateAtsScore } = require("../services/atsService");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const Resume = require("../models/Resume");

const analyzeUploadedResume = async (req, res, next) => {
  let parser;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    parser = new PDFParse({
      data: new Uint8Array(req.file.buffer),
    });

    const result = await parser.getText();
    const resumeText = result.text?.trim();

    if (!resumeText) {
      return res.status(400).json({
        message: "No readable text found in the PDF",
      });
    }

    const ats = calculateAtsScore(resumeText);

    const analysis = await analyzeResume({
      resumeText,
      resumeAnalysisPrompt: `
Analyze this resume text:
${resumeText}

Return valid JSON only with these fields:
{
  "mainSkills": [],
  "strongAreas": [],
  "missingSkills": [],
  "suitableRoles": [],
  "suggestions": []
}

Every field must be an array of strings.
Do not include markdown or text outside the JSON.
`,
    });

    // Save the latest result so other features (e.g. Placement Readiness)
    // can use it. A failure here must not break the upload response.
    try {
      const userId = req.user && req.user.userId;

      if (userId) {
        await ResumeAnalysis.findOneAndUpdate(
          { user: userId },
          {
            user: userId,
            fileName: req.file.originalname,
            analysis,
            ats,
          },
          { upsert: true, new: true }
        );

        // Skill Gap, Roadmap and Interview read the Resume profile.
        // If the student has none yet, create a basic one from the skills
        // found in the upload. $setOnInsert never overwrites an existing
        // profile.
        const skills = [
          ...new Set(
            (Array.isArray(analysis.mainSkills) ? analysis.mainSkills : [])
              .filter((skill) => typeof skill === "string" && skill.trim())
              .map((skill) => skill.trim())
          ),
        ].slice(0, 50);

        if (skills.length > 0) {
          await Resume.updateOne(
            { user: userId },
            { $setOnInsert: { skills } },
            { upsert: true }
          );
        }
      }
    } catch (saveError) {
      console.error("RESUME ANALYSIS SAVE ERROR:", saveError.message);
    }

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis,
      ats,
    });
  } catch (error) {
    console.error("UPLOADED RESUME ANALYSIS ERROR:", error.message);
    return next(error);
  } finally {
    if (parser) {
      await parser.destroy().catch(() => {});
    }
  }
};

module.exports = { analyzeUploadedResume };
