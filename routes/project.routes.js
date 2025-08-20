const express = require("express");
const multer = require("multer");
const {
  fetchProjects,
  fetchProjectById,
  createProject,
} = require("../controllers/project.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const projectRouter = express.Router();

projectRouter.get("/", fetchProjects);

projectRouter.get("/:id", fetchProjectById);

projectRouter.post("/", upload.array("images", 3), createProject);

module.exports = projectRouter;
