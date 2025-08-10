require("./config/env.config");
const express = require("express");
const { connectToDatabase } = require("./config/mongodb.config");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectToDatabase();
});
