const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Database connection successful");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

module.exports = { connectToDatabase };
