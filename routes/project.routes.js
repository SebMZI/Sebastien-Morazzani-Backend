const express = require("express");

const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  console.log("Fetching all projects");
  res.send("All projects");
});

projectRouter.get("/:id", (req, res) => {
  console.log("Fetching project details");
  res.send(`Project details for ID: ${req.params.id}`);
});

projectRouter.post("/", (req, res) => {
  console.log("Creating a new project");
  res.send("Project created");
});

module.exports = projectRouter;
