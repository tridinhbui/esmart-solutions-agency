const express = require("express");
const router = express.Router();

const {
    calculateScore,
    generateReport,
} = require("../controllers/questionnaireController");

router.post("/submit", (req, res) => {
    if (!req.body.answers) {
        return res.status(400).json({ message: "Answers are required" });
    }
    if (!Array.isArray(req.body.answers)) {
        return res.status(400).json({ message: "Answers must be an array" });
    }
    const answers = req.body.answers;
    const score = calculateScore(answers);
    const report = generateReport(score);
    res.json({ score, report });
});

module.exports = router;