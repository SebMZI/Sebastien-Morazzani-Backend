import mongoose from "mongoose";
import connectToDatabase from "../config/mongodb.config";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectToDatabase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error if DATABASE_URI is not defined", async () => {
    delete process.env.DATABASE_URI;
    await expect(connectToDatabase()).rejects.toThrow(
      "DATABASE_URI is not defined in environment variables"
    );
  });

  it("thorws a connection error if mongoose.connect fails", async () => {
    process.env.DATABASE_URI = "mongodb://localhost/test";

    mongoose.connect.mockRejectedValueOnce(new Error("Connection error"));

    await expect(connectToDatabase()).rejects.toThrow(
      "Database connection failed: Connection error"
    );
  });

  it("calls mongoose.connect with the correct URI", async () => {
    process.env.DATABASE_URI = "mongodb://localhost:27017/testdb";

    await connectToDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/testdb"
    );
  });
});
