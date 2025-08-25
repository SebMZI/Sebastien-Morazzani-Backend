import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    required: [true, "Username is required"],
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    unique: true,
    required: [true, "Email is required"],
    type: String,
    match: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
});

export default mongoose.model("User", userSchema);
