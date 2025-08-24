import express from "express";
import multer from "multer";
import {
  fetchProjects,
  fetchProjectById,
  createProject,
  deleteProject,
} from "../controllers/project.controller.js";
import ajMw from "../middlewares/arcjet.middleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const projectRouter = express.Router();

projectRouter.get("/", ajMw, fetchProjects);

projectRouter.get("/:id", fetchProjectById);

projectRouter.delete("/:id", deleteProject);

projectRouter.post("/", upload.array("images", 3), createProject);

export default projectRouter;
