const path = require("path");
const fs = require("fs");
const { sequelize } = require("./database");
const { Umzug, SequelizeStorage } = require("umzug");

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, "../migrations"),
    params: [sequelize.getQueryInterface(), sequelize.constructor],
    pattern: /\.js$/,
  },
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Run migrations
(async () => {
  try {
    // Get the list of migration files
    const migrationsDir = path.join(__dirname, "../migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".js"))
      .map((file) => path.join(migrationsDir, file));

    console.log("Migration files found:");
    migrationFiles.forEach((file) => console.log(` - ${path.basename(file)}`));

    // Run pending migrations
    console.log("\nRunning migrations...");
    await umzug.up();
    console.log("All migrations have been executed successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Error running migrations:", err);
    process.exit(1);
  }
})();
