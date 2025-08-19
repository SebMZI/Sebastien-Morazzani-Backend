const Project = require("../models/project.model");
const mongoose = require("mongoose");

const fetchProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No projects found" });
    }

    return res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

const fetchProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Project ID is invalid" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({
      message: "Project fetched successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

const createProject = (req, res, next) => {
  try {
    const {
      projectName,
      description,
      year,
      categories,
      link,
      images,
      stack,
      client,
    } = req.body;

    if (
      !projectName ||
      !description ||
      !year ||
      !categories ||
      !link ||
      !images ||
      !stack ||
      !client
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchProjects,
  fetchProjectById,
  createProject,
};
