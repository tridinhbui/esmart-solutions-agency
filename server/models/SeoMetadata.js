const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Content = require("./Content");

const SeoMetadata = sequelize.define(
  "SeoMetadata",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "contents",
        key: "id",
      },
    },
    seoScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    keywordDensity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    readabilityScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    suggestedKeywords: {
      type: DataTypes.TEXT, // JSON stored as string
      allowNull: true,
    },
    analysisReport: {
      type: DataTypes.TEXT, // JSON stored as string
      allowNull: true,
    },
    optimizationCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "seo_metadata",
    timestamps: true,
  }
);

// Define associations
SeoMetadata.belongsTo(Content, {
  foreignKey: "contentId",
  onDelete: "CASCADE",
});
Content.hasOne(SeoMetadata, { foreignKey: "contentId" });

module.exports = SeoMetadata;
