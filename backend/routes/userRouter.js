import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  updateProfile,
  increaseCount,
} from "../controllers/userController.js";

import isUserLoggedIn from "../middleware/userAuth.js";
import User from "../models/userModel.js";
import { isLoggedIn } from "../middleware/isUserLoggedIn.js";

const authRouter = express.Router();

authRouter.get("/auth/me", isLoggedIn, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error from backend in route auth/me");
    res.status(500).json({ success: false, message: "Server error" });
  }
});
authRouter.get("/auth/updateCount", isLoggedIn, increaseCount);
authRouter.post("/auth/signup", signupUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/logout", logoutUser);
authRouter.post("/auth/update-profile", isUserLoggedIn, updateProfile);

authRouter.get("/count-not-seeded", async (req, res) => {
  console.log("Counting users called");
  try {
    const count = await User.countDocuments({ isSeeded: { $ne: true } });
    console.log(count);
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
export default authRouter;
