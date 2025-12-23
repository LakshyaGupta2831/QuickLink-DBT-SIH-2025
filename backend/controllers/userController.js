import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
const authRouter = express.Router();
import { isValidEmail, createToken } from "../lib/utils.js";

const signupUser = async (req, res) => {
  try {
    let { email, password, fullName, state, city, category } = req.body;

    if (!email || !password || !fullName || !state || !city || !category) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login", success: false });
    }
    // Create new user
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      state,
      city,
      category,
    });
    await newUser.save();
    let userData = newUser.toObject();
    delete userData.password;
    console.log(userData);
    let token = await createToken(newUser._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log("New user created:");
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Error during signup:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Login user called");
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    let token = await createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, state, city, category } = req.body;
    if (!fullName || !state || !city || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = req.user;
    user.fullName = fullName;
    user.state = state;
    user.city = city;
    user.category = category;
    await user.save();
    return res.status(200).json({
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

const increaseCount = async (req, res) => {
  try {
    // req.user already contains authenticated user injected by middleware
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // increment count
    user.checkCount = user.checkCount + 1;

    await user.save();

    return res.json({
      status: true,
      message: "Count updated successfully",
      count: user.count,
    });
  } catch (err) {
    console.error("Error updating count", err);
    return res.status(500).json({
      status: false,
      message: "Server error while updating count",
    });
  }
};

export { signupUser, loginUser, logoutUser, updateProfile, increaseCount };
