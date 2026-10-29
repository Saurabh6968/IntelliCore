const express = require("express");

const { getMlPrediction } = require("../controllers/mlPredictionController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", authMiddleware, getMlPrediction);

module.exports = router;
