const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Project = require("./Project");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generatedContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seoData: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "JSON string containing SEO data and workflow information",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "URL or path to the image generated for this content",
    },
    imagePrompt: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "The prompt used to generate the image",
    },
    image_data: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
      comment: "Binary data of the image stored directly in the database",
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
    tableName: "contents",
    timestamps: true,
  }
);

// Define associations
Content.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });
Project.hasMany(Content, { foreignKey: "projectId" });

module.exports = Content;
