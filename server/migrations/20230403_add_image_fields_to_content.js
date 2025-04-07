"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contents", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "URL or path to the image generated for this content",
    });

    await queryInterface.addColumn("contents", "imagePrompt", {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "The prompt used to generate the image",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("contents", "imageUrl");
    await queryInterface.removeColumn("contents", "imagePrompt");
  },
};
