const express = require("express");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectStatus,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

// Get all projects
router.get("/projects", getAllProjects);

// Get project by ID
router.get("/projects/:id", getProjectById);

// Create a new project
router.post("/projects", createProject);

// Update project status
router.patch("/projects/:id/status", updateProjectStatus);

// Delete a project
router.delete("/projects/:id", deleteProject);

module.exports = router;
