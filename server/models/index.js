const { sequelize } = require("../config/database");
const Project = require("./Project");
const Content = require("./Content");
const SeoMetadata = require("./SeoMetadata");

// MongoDB connection
const mongoose = require("mongoose");
const TrendData = require("./TrendData");

// Initialize all models
const initializeModels = async () => {
  try {
    // Sync all Sequelize models with PostgreSQL database
    await sequelize.sync({ alter: true });
    console.log("All PostgreSQL models were synchronized successfully.");

    // Connect to MongoDB if environment has MONGODB_URI defined
    if (process.env.MONGODB_URI) {
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully.");
      } catch (mongoError) {
        console.error("Failed to connect to MongoDB:", mongoError);
      }
    } else {
      console.log(
        "MongoDB connection URI not found. Skipping MongoDB connection."
      );
    }
  } catch (error) {
    console.error("Failed to synchronize models:", error);
  }
};

module.exports = {
  sequelize,
  mongoose,
  Project,
  Content,
  SeoMetadata,
  TrendData,
  initializeModels,
};
