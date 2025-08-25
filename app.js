import "./config/env.config.js";
import express from "express";
import connectToDatabase from "./config/mongodb.config.js";
import projectRouter from "./routes/project.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/projects", projectRouter);

app.use(errorMiddleware);

// Server
app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectToDatabase();
});
