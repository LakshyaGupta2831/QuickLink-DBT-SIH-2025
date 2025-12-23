import express from "express";
import { isValidEmail } from "../lib/utils.js";
import {
  loginAdmin,
  logoutAdmin,
  getAnalytics,
} from "../controllers/adminController.js";
import isAdminLoggedIn from "../middleware/adminAuth.js";

const adminRouter = express.Router();

// login logout
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.post("/getanalytics", getAnalytics);

// other routes

//
adminRouter.post("/ping", isAdminLoggedIn, (req, res) => {
  console.log("admin pinged");
  res.status(200).json({ message: "Admin authenticated" });
});

// email broadcast

// website broadcast

// analytics

// queries management

export default adminRouter;

// /admin/analytics/summary
// /admin/analytics/state-distribution
// /admin/analytics/category-distribution
// /admin/analytics/seeded-summary
// /admin/analytics/daily-checks
// /admin/analytics/hourly-checks
// /admin/analytics/seeded-trend
// /admin/analytics/top-active-users
// /admin/analytics/state-check-activity
// /admin/analytics/category-check-activity
