import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

const fetchProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.find();
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

    const project = await projectModel.findById(projectId);
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

const createProject = async (req, res, next) => {
  try {
    const {
      projectName,
      description,
      year,
      categories,
      linkToProject,
      stack,
      clientName,
    } = req.body;

    if (
      !projectName ||
      !description ||
      !year ||
      !categories ||
      !linkToProject ||
      !stack ||
      !clientName
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const images = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const project = new projectModel({
      project: projectName,
      description,
      year,
      categories,
      link: linkToProject,
      images,
      stack,
      client: clientName,
    });

    await project.save();

    res.status(201).json({
      message: "Project successfully created",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Project ID is invalid" });
    }

    const project = await projectModel.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({
      message: "Project successfully deleted",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export { fetchProjects, fetchProjectById, createProject, deleteProject };
