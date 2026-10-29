const mongoose = require("mongoose");

const scoreField = () => ({
  type: Number,
  min: 0,
  max: 100,
  required: true,
});

const placementProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cgpa: { type: Number, min: 0, max: 10, required: true },
    backlogs: { type: Number, min: 0, max: 30, required: true },

    attendancePct: scoreField(),
    codingSkillScore: scoreField(),
    dsaScore: scoreField(),
    coreCsScore: scoreField(),
    aptitudeScore: scoreField(),
    communicationScore: scoreField(),
    englishScore: scoreField(),

    codingHoursPerWeek: { type: Number, min: 0, max: 100, required: true },
    interviewPracticeHoursPerWeek: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    // Optional. If empty, they are taken from the saved Resume education.
    degree: { type: String, trim: true, default: "" },
    branch: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
);

const PlacementProfile = mongoose.model(
  "PlacementProfile",
  placementProfileSchema
);

module.exports = PlacementProfile;
