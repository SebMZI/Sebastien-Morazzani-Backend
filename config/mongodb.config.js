import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Database connection successful");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectToDatabase;
