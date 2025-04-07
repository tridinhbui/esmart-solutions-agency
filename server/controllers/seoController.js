const { SeoMetadata, Content, TrendData } = require("../models");
const {
  analyzeSEO,
  optimizeContent,
  generateSEOReport,
} = require("../services/seoService");

/**
 * Analyze SEO for a content
 */
const analyzeContentSEO = async (req, res) => {
  try {
    const { contentId } = req.params;
    console.log(
      `[SEO_API] Request to analyze SEO for content ID: ${contentId}`
    );

    // Check if content exists
    const content = await Content.findByPk(contentId);
    if (!content) {
      console.log(`[SEO_API] Content ID: ${contentId} does not exist`);
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Perform SEO analysis
    console.log(`[SEO_API] Starting SEO analysis for content ID: ${contentId}`);
    const analysis = await analyzeSEO(contentId);
    console.log(
      `[SEO_API] SEO analysis completed for content ID: ${contentId}, score: ${analysis.seoScore}`
    );

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error(`[SEO_API] Error when analyzing SEO:`, error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze content SEO",
      details: error.message,
    });
  }
};

/**
 * Optimize content based on SEO analysis
 */
const optimizeContentSEO = async (req, res) => {
  try {
    const { contentId } = req.params;
    console.log(
      `[SEO_API] Request to optimize SEO for content ID: ${contentId}`
    );

    // Check if content exists
    const content = await Content.findByPk(contentId);
    if (!content) {
      console.log(`[SEO_API] Content ID: ${contentId} does not exist`);
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Perform content optimization
    console.log(
      `[SEO_API] Starting SEO optimization for content ID: ${contentId}`
    );
    const optimizedResult = await optimizeContent(contentId);
    console.log(`[SEO_API] SEO optimization completed for content ID: ${contentId}, 
                score before: ${optimizedResult.previousScore}, 
                score after: ${optimizedResult.newScore}`);

    res.json({
      success: true,
      data: optimizedResult,
    });
  } catch (error) {
    console.error(`[SEO_API] Error when optimizing SEO:`, error);
    res.status(500).json({
      success: false,
      error: "Failed to optimize content SEO",
      details: error.message,
    });
  }
};

/**
 * Get SEO report for a content
 */
const getSEOReport = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Check if content exists
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Generate SEO report
    const report = await generateSEOReport(contentId);

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error getting SEO report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get SEO report",
      details: error.message,
    });
  }
};

/**
 * Get trend keywords from MongoDB
 */
const getTrendKeywords = async (req, res) => {
  try {
    const { keyword } = req.query;
    let query = {};

    if (keyword) {
      query.keyword = { $regex: new RegExp(keyword, "i") };
    }

    // Get trend data from MongoDB
    const trends = await TrendData.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: trends,
    });
  } catch (error) {
    console.error("Error getting trend keywords:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get trend keywords",
      details: error.message,
    });
  }
};

/**
 * Get SEO metadata for a content
 */
const getSEOMetadata = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Find SEO metadata
    const seoMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    if (!seoMetadata) {
      return res.status(404).json({
        success: false,
        error: "SEO metadata not found",
      });
    }

    // Convert JSON from string
    let metadata = seoMetadata.toJSON();
    if (metadata.suggestedKeywords) {
      try {
        metadata.suggestedKeywords = JSON.parse(metadata.suggestedKeywords);
      } catch (e) {
        metadata.suggestedKeywords = [];
      }
    }

    if (metadata.analysisReport) {
      try {
        metadata.analysisReport = JSON.parse(metadata.analysisReport);
      } catch (e) {
        metadata.analysisReport = {};
      }
    }

    res.json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("Error getting SEO metadata:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get SEO metadata",
      details: error.message,
    });
  }
};

/**
 * Initialize automatic SEO optimization process
 */
const autoOptimizeSEO = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { maxOptimizations = 3, targetScore = 80 } = req.body;
    console.log(
      `[SEO_API] Request automatic SEO optimization for content ID: ${contentId}`
    );
    console.log(
      `[SEO_API] Parameters: maxOptimizations=${maxOptimizations}, targetScore=${targetScore}`
    );

    // Check if content exists
    const content = await Content.findByPk(contentId);
    if (!content) {
      console.log(`[SEO_API] Content ID: ${contentId} does not exist`);
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // 1. Perform initial SEO analysis
    console.log(
      `[SEO_API] Starting SEO analysis before automatic optimization`
    );
    let analysis = await analyzeSEO(contentId);
    let currentScore = analysis.seoScore;
    let optimizationCount = 0;
    let highestScore = currentScore; // Track highest score

    let optimizationResults = [
      {
        iteration: 0,
        score: currentScore,
        timestamp: new Date(),
      },
    ];

    console.log(`[SEO_API] Initial SEO score: ${currentScore}`);

    // 2. Loop optimization until target is reached or max iterations are reached
    while (currentScore < targetScore && optimizationCount < maxOptimizations) {
      console.log(`[SEO_API] Optimization iteration ${optimizationCount + 1}`);

      // Optimize content
      const optimizedResult = await optimizeContent(contentId);
      optimizationCount++;

      // Update score
      currentScore = optimizedResult.newScore || currentScore;
      console.log(
        `[SEO_API] New score after iteration ${optimizationCount}: ${currentScore}`
      );

      // Update highest score if new score is higher
      if (currentScore > highestScore) {
        highestScore = currentScore;
        console.log(`[SEO_API] Updated highest score: ${highestScore}`);
      }

      // Save optimization result
      optimizationResults.push({
        iteration: optimizationCount,
        score: currentScore,
        timestamp: new Date(),
      });

      // If target is reached, exit loop
      if (currentScore >= targetScore) {
        console.log(
          `[SEO_API] Target reached (${targetScore}), stopping automatic optimization`
        );
        break;
      }
    }

    // 3. Generate final report
    console.log(`[SEO_API] Generating final optimization report`);
    const finalReport = await generateSEOReport(contentId);

    // Ensure highest score is used
    const seoMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    if (seoMetadata && seoMetadata.seoScore < highestScore) {
      seoMetadata.seoScore = highestScore;
      await seoMetadata.save();
      finalReport.seoScore = highestScore;
    }

    console.log(
      `[SEO_API] Automatic optimization completed with ${optimizationCount} optimizations`
    );

    res.json({
      success: true,
      data: {
        contentId,
        initialScore: optimizationResults[0].score,
        finalScore: highestScore,
        targetScore,
        optimizationCount,
        reachedTarget: highestScore >= targetScore,
        optimizationResults,
        finalReport,
      },
    });
  } catch (error) {
    console.error("Error auto optimizing SEO:", error);
    res.status(500).json({
      success: false,
      error: "Failed to auto optimize SEO",
      details: error.message,
    });
  }
};

module.exports = {
  analyzeContentSEO,
  optimizeContentSEO,
  getSEOReport,
  getTrendKeywords,
  getSEOMetadata,
  autoOptimizeSEO,
};
