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

// GET: Lấy báo cáo SEO cho một content
router.get("/report/:contentId", getSEOReport);

// GET: Lấy metadata SEO cho một content
router.get("/metadata/:contentId", getSEOMetadata);

// GET: Lấy trending keywords
router.get("/trends", getTrendKeywords);

// POST: Phân tích SEO cho một content
router.post("/analyze/:contentId", analyzeContentSEO);

// POST: Tối ưu hóa content dựa trên phân tích SEO
router.post("/optimize/:contentId", optimizeContentSEO);

// POST: Tự động tối ưu hóa content
router.post("/auto-optimize/:contentId", autoOptimizeSEO);

module.exports = router;
