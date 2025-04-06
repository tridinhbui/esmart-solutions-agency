const express = require("express");
const router = express.Router();
const {
  analyzeContentSEO,
  optimizeContentSEO,
  getSEOReport,
  getTrendKeywords,
  getSEOMetadata,
  autoOptimizeSEO,
} = require("../controllers/seoController");

// GET: Retrieve SEO report for specific content
router.get("/report/:contentId", getSEOReport);

// GET: Fetch SEO metadata for specific content
router.get("/metadata/:contentId", getSEOMetadata);

// GET: Get trending keywords
router.get("/trends", getTrendKeywords);

// POST: Analyze SEO for specific content
router.post("/analyze/:contentId", analyzeContentSEO);

// POST: Optimize content based on SEO analysis
router.post("/optimize/:contentId", optimizeContentSEO);

// POST: Auto-optimize content for SEO
router.post("/auto-optimize/:contentId", autoOptimizeSEO);

module.exports = router;
