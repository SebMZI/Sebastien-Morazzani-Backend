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
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  stack: {
    type: [String],
  },
  client: {
    type: String,
  },
});

module.exports = mongoose.model("Project", projectSchema);
