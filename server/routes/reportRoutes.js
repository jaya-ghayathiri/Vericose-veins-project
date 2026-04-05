const express = require("express");
const router = express.Router();

const { createReport, getReports } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// SAVE REPORT
router.post("/", protect, upload.single("image"), createReport);

// GET REPORTS
router.get("/", protect, getReports);

module.exports = router;