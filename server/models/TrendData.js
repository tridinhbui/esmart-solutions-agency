const mongoose = require("mongoose");

// Define schema for trend data
const trendDataSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
      index: true,
    },
    relatedKeywords: [
      {
        type: String,
      },
    ],
    trend_score: {
      type: Number,
      default: 0,
    },
    interest_over_time: {
      type: Map,
      of: Number,
    },
    searchVolume: {
      type: Number,
    },
    competition: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    competitionIndex: {
      type: Number,
      min: 0,
      max: 100,
    },
    recommendations: {
      type: [String],
    },
    analysisText: {
      type: String,
    },
    source: {
      type: String,
      default: "gemini_pro",
    },
    category: {
      type: String,
    },
    contentIds: [
      {
        type: String,
        ref: "Content",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "30d", // Auto-delete after 30 days
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    trend: {
      type: String,
      default: "Stable",
    },
    topic: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure indexes for query performance
trendDataSchema.index({ keyword: 1, createdAt: -1 });
trendDataSchema.index({ contentIds: 1 });

// Create model from schema
const TrendData = mongoose.model("TrendData", trendDataSchema);

module.exports = TrendData;
