import express from "express";
import multer from "multer";
import {
  fetchProjects,
  fetchProjectById,
  createProject,
} from "../controllers/project.controller.js";
import ajMw from "../middlewares/arcjet.middleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const projectRouter = express.Router();

projectRouter.get("/", ajMw, fetchProjects);

projectRouter.get("/:id", fetchProjectById);

projectRouter.post("/", upload.array("images", 3), createProject);

export default projectRouter;
