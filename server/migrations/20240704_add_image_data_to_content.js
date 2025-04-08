"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contents", "image_data", {
      type: Sequelize.BLOB("long"),
      allowNull: true,
      comment: "Binary data of the image stored directly in the database",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("contents", "image_data");
  },
};
