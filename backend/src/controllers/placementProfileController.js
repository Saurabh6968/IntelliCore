const PlacementProfile = require("../models/PlacementProfile");

const NUMERIC_FIELDS = [
  "cgpa",
  "backlogs",
  "attendancePct",
  "codingSkillScore",
  "dsaScore",
  "coreCsScore",
  "aptitudeScore",
  "communicationScore",
  "englishScore",
  "codingHoursPerWeek",
  "interviewPracticeHoursPerWeek",
];

// Get the saved profile (null if the student has not filled it in yet)
const getPlacementProfile = async (req, res, next) => {
  try {
    const profile = await PlacementProfile.findOne({
      user: req.user.userId,
    });

    res.status(200).json({
      message: "Placement profile fetched successfully",
      profile,
    });
  } catch (error) {
    console.error("GET PLACEMENT PROFILE ERROR:", error.message);

    next(error);
  }
};

// Create or update the profile
const savePlacementProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const update = {};

    for (const field of NUMERIC_FIELDS) {
      const raw = req.body[field];

      if (raw === undefined || raw === null || raw === "") {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }

      const value = Number(raw);

      if (Number.isNaN(value)) {
        return res.status(400).json({
          message: `${field} must be a number`,
        });
      }

      update[field] = value;
    }

    update.degree =
      typeof req.body.degree === "string" ? req.body.degree.trim() : "";
    update.branch =
      typeof req.body.branch === "string" ? req.body.branch.trim() : "";

    const profile = await PlacementProfile.findOneAndUpdate(
      { user: userId },
      { $set: update },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      message: "Placement profile saved successfully",
      profile,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const first = Object.values(error.errors)[0];

      return res.status(400).json({
        message: first ? first.message : "Invalid profile data",
      });
    }

    console.error("SAVE PLACEMENT PROFILE ERROR:", error.message);

    next(error);
  }
};

module.exports = {
  getPlacementProfile,
  savePlacementProfile,
};
