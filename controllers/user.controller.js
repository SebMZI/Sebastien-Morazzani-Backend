import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const userToReturn = { ...newUser.toObject() };
    delete userToReturn.password;

    res
      .status(201)
      .json({ message: "User created successfully", data: userToReturn });
  } catch (err) {
    next(err);
  }
};

export { createUser };
