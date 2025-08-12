const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project: {
    type: String,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
  },
  categorie: {
    type: String,
  },
  link: {
    type: String,
  },
  images: {
    type: [String],
  },
  stack: {
    type: [String],
  },
});

module.exports = mongoose.model("Project", projectSchema);
