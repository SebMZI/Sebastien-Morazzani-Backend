const express = require("express");
const { fetchProjects, fetchProjectById, createProject } = require("../controllers/project.controller");

const projectRouter = express.Router();

projectRouter.get("/", fetchProjects);

projectRouter.get("/:id", fetchProjectById);

projectRouter.post("/", createProject);

module.exports = projectRouter;
