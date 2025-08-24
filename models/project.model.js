import mongoose from "mongoose";

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
  categories: {
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

export default mongoose.model("Project", projectSchema);
