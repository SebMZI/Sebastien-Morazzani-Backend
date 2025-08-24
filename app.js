import "./config/env.config.js";
import express from "express";
import connectToDatabase from "./config/mongodb.config.js";
import projectRouter from "./routes/project.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/projects", projectRouter);

// Server
app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectToDatabase();
});
