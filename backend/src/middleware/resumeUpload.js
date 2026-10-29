
const multer = require("multer");

const storage = multer.memoryStorage();

const uploadResume = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const isPdf =
      file.mimetype === "application/pdf" &&
      file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return callback(new Error("Only PDF files are allowed"));
    }

    callback(null, true);
  },
});

module.exports = uploadResume;
