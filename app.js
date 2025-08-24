require("./config/env.config");
const express = require("express");
const { connectToDatabase } = require("./config/mongodb.config");
const projectRouter = require("./routes/project.routes");
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
