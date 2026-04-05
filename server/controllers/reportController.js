const Report = require("../models/Report");

// CREATE REPORT
const createReport = async (req, res) => {
  try {
    const { result, probability, stage } = req.body;

    const report = new Report({
      user: req.user._id,
      image: req.file.path, // stored file path
      result,
      probability,
      stage,
    });

    await report.save();

    res.status(201).json({ message: "Report saved", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REPORTS FOR USER
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReport, getReports };