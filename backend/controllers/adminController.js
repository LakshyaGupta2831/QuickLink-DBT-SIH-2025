import jwt from "jsonwebtoken";
import { isValidEmail } from "../lib/utils.js";
import User from "../models/userModel.js";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const loginAdmin = async (req, res) => {
  try {
    console.log("loginAdmin called");
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Compare admin credentials with ENV
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    // Create token with email + password
    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store JWT inside cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Admin signed in successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Error during logout:");
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getAnalytics = async (req, res) => {
//   try {
//     console.log("getAnalytics called");

//     // 1. Total Users
//     const totalUsers = await User.countDocuments();

//     // 2. Seeded vs Not Seeded
//     const seededCounts = await User.aggregate([
//       { $group: { _id: "$isSeeded", count: { $sum: 1 } } },
//     ]);

//     const seedingStatus = {
//       seeded: seededCounts.find((i) => i._id === true)?.count || 0,
//       notSeeded: seededCounts.find((i) => i._id === false)?.count || 0,
//     };

//     // 3. State-wise distribution
//     const stateDistribution = await User.aggregate([
//       { $group: { _id: "$state", count: { $sum: 1 } } },
//       { $project: { state: "$_id", count: 1, _id: 0 } },
//     ]);

//     // 4. Category-wise distribution
//     const categoryDistribution = await User.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $project: { category: "$_id", count: 1, _id: 0 } },
//     ]);

//     // 5. Total check usage
//     const totalCheckUsageResult = await User.aggregate([
//       { $group: { _id: null, totalChecks: { $sum: "$checkCount" } } },
//     ]);
//     const totalCheckUsage = totalCheckUsageResult[0]?.totalChecks || 0;

//     // 6. Top 5 states by sum of checkCount
//     const topStatesByChecks = await User.aggregate([
//       { $group: { _id: "$state", totalChecks: { $sum: "$checkCount" } } },
//       { $sort: { totalChecks: -1 } },
//       { $limit: 5 },
//       { $project: { state: "$_id", totalChecks: 1, _id: 0 } },
//     ]);

//     // 7. Recent checks (last 10)
//     const recentChecks = await User.find(
//       { lastCheckedAt: { $ne: null } },
//       { email: 1, state: 1, isSeeded: 1, lastCheckedAt: 1 }
//     )
//       .sort({ lastCheckedAt: -1 })
//       .limit(10);

//     // ------------------------------
//     // 🧠 8. Generate AI Insights
//     // ------------------------------
//     const analytics = {
//       totalUsers,
//       seedingStatus,
//       stateDistribution,
//       categoryDistribution,
//       totalCheckUsage,
//       topStatesByChecks,
//       recentChecks,
//     };

//     const prompt = `
// You are an analytics assistant for an admin dashboard (Direct Benefit Transfer project).
// Input JSON (dashboard) contains counts, distributions, recent checks, and top states.
// Produce a strict JSON output (no extra text) following this schema:

// {
//   "summary": "short single-paragraph summary (<=40 words).",
//   "topInsights": ["concise bullet items - 1 to 5"],
//   "issues": ["if any problems or anomalies detected, list them, else []"],
//   "suggestions": ["clear action items prioritized 1..n (<=5)"],
//   "alerts": [{"level": "info|warning|critical", "message": "short message"}],
//   "widgets": {
//     "headlineCards": [{"title": "Total Users", "value": "3", "hint": ""}],
//     "chartRecommendations": [
//       {"chart": "pie|bar|line", "reason": "why", "dataField": "seedingStatus|categoryDistribution|..."}
//     ]
//   }
// }

// Rules:
// - Respond EXACTLY as valid JSON.
// - Do NOT include explanations before/after JSON.
// - If any field lacks data, fill with safe defaults: "", [], {}.
// - Keep lines short and action-oriented.
// - Use the dashboard JSON below to generate output.

// Here is the dashboard JSON:
// ${JSON.stringify(analytics, null, 2)}
// `.trim();

//     let aiInsights = "";

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//       const result = await model.generateContent(prompt);
//       const rawText = result?.response?.text()?.trim() || "{}";
//       // aiInsights = result?.response?.text()?.trim() || "";
//       try {
//         aiInsights = JSON.parse(rawText); // <-- now JS object
//       } catch (jsonErr) {
//         console.warn(
//           "Invalid JSON returned by Gemini, fallback applied:",
//           rawText
//         );
//         aiInsights = {
//           summary: "",
//           topInsights: [],
//           issues: [],
//           suggestions: [],
//           alerts: [],
//           widgets: { headlineCards: [], chartRecommendations: [] },
//         };
//       }
//     } catch (err) {
//       console.error("Gemini API error:", err);
//       aiInsights = ""; // fail silently and still return analytics
//     }

//     // ------------------------------
//     // 9. Response back to frontend
//     // ------------------------------
//     return res.json({
//       success: true,
//       data: {
//         ...analytics,
//         aiInsights, // 🎯 included now
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

const getAnalytics = async (req, res) => {
  try {
    console.log("getAnalytics called");

    // 1. Total Users
    const totalUsers = await User.countDocuments();

    // 2. Seeded vs Not Seeded
    const seededCounts = await User.aggregate([
      { $group: { _id: "$isSeeded", count: { $sum: 1 } } },
    ]);

    const seedingStatus = {
      seeded: seededCounts.find((i) => i._id === true)?.count || 0,
      notSeeded: seededCounts.find((i) => i._id === false)?.count || 0,
    };

    // 3. State-wise distribution
    const stateDistribution = await User.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } },
      { $project: { state: "$_id", count: 1, _id: 0 } },
    ]);

    // 4. Category-wise distribution
    const categoryDistribution = await User.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
    ]);

    // 5. Total check usage
    const totalCheckUsageResult = await User.aggregate([
      { $group: { _id: null, totalChecks: { $sum: "$checkCount" } } },
    ]);
    const totalCheckUsage = totalCheckUsageResult[0]?.totalChecks || 0;

    // 6. Top 5 states by sum of checkCount
    const topStatesByChecks = await User.aggregate([
      { $group: { _id: "$state", totalChecks: { $sum: "$checkCount" } } },
      { $sort: { totalChecks: -1 } },
      { $limit: 5 },
      { $project: { state: "$_id", totalChecks: 1, _id: 0 } },
    ]);

    // 7. Recent checks (last 10)
    const recentChecks = await User.find(
      { lastCheckedAt: { $ne: null } },
      { email: 1, state: 1, isSeeded: 1, lastCheckedAt: 1 }
    )
      .sort({ lastCheckedAt: -1 })
      .limit(10);

    // ------------------------------
    // 🧠 8. Generate AI Insights
    // ------------------------------
    const analytics = {
      totalUsers,
      seedingStatus,
      stateDistribution,
      categoryDistribution,
      totalCheckUsage,
      topStatesByChecks,
      recentChecks,
    };

    const prompt = `
You are an analytics assistant for an admin dashboard (Direct Benefit Transfer project).
Input JSON (dashboard) contains counts, distributions, recent checks, and top states.
Produce a strict JSON output (no extra text) following this schema:

{
  "summary": "short single-paragraph summary (<=40 words).",
  "topInsights": ["concise bullet items - 1 to 5"],
  "issues": ["if any problems or anomalies detected, list them, else []"],
  "suggestions": ["clear action items prioritized 1..n (<=5)"],
  "alerts": [{"level": "info|warning|critical", "message": "short message"}],
  "widgets": {
    "headlineCards": [{"title": "Total Users", "value": "3", "hint": ""}],
    "chartRecommendations": [
      {"chart": "pie|bar|line", "reason": "why", "dataField": "seedingStatus|categoryDistribution|..."}
    ]
  }
}

Rules:
- Respond EXACTLY as valid JSON.
- Do NOT include explanations before/after JSON.
- If any field lacks data, fill with safe defaults: "", [], {}.
- Use the dashboard JSON below to generate output.

Here is the dashboard JSON:
${JSON.stringify(analytics, null, 2)}
`.trim();

    let aiInsights = {};

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);

      const raw = result?.response?.text()?.trim() || "{}";

      // Remove ```json or ``` if present
      const cleaned = raw
        .replace(/^```json/i, "") // remove starting ```json
        .replace(/^```/, "") // remove starting ```
        .replace(/```$/, "") // remove ending ```
        .trim();

      try {
        aiInsights = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error("Failed to parse AI JSON → fallback used:", cleaned);
        aiInsights = {
          summary: "",
          topInsights: [],
          issues: [],
          suggestions: [],
          alerts: [],
          widgets: { headlineCards: [], chartRecommendations: [] },
        };
      }
    } catch (err) {
      console.error("Gemini API request failed:", err);
      aiInsights = {
        summary: "",
        topInsights: [],
        issues: [],
        suggestions: [],
        alerts: [],
        widgets: { headlineCards: [], chartRecommendations: [] },
      };
    }
    // ------------------------------
    // 9. Response back to frontend
    // ------------------------------
    return res.json({
      success: true,
      data: {
        ...analytics,
        aiInsights, // 🎯 included now
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// change this to , it should not give output in json format rather in js object

// const getAnalytics = async (req, res) => {
//   try {
//     console.log("getAnalytics called");
//     // 1. Total Users
//     const totalUsers = await User.countDocuments();

//     // 2. Seeded vs Not Seeded
//     const seededCounts = await User.aggregate([
//       { $group: { _id: "$isSeeded", count: { $sum: 1 } } },
//     ]);

//     // Normalize
//     const seedingStatus = {
//       seeded: seededCounts.find((i) => i._id === true)?.count || 0,
//       notSeeded: seededCounts.find((i) => i._id === false)?.count || 0,
//     };

//     // 3. State-wise distribution
//     const stateDistribution = await User.aggregate([
//       { $group: { _id: "$state", count: { $sum: 1 } } },
//       { $project: { state: "$_id", count: 1, _id: 0 } },
//     ]);

//     // 4. Category-wise distribution
//     const categoryDistribution = await User.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $project: { category: "$_id", count: 1, _id: 0 } },
//     ]);

//     // 5. Total check usage
//     const totalCheckUsageResult = await User.aggregate([
//       { $group: { _id: null, totalChecks: { $sum: "$checkCount" } } },
//     ]);

//     const totalCheckUsage = totalCheckUsageResult[0]?.totalChecks || 0;

//     // 6. Top 5 states by sum of checkCount
//     const topStatesByChecks = await User.aggregate([
//       { $group: { _id: "$state", totalChecks: { $sum: "$checkCount" } } },
//       { $sort: { totalChecks: -1 } },
//       { $limit: 5 },
//       { $project: { state: "$_id", totalChecks: 1, _id: 0 } },
//     ]);

//     // 7. Recent checks (last 10)
//     const recentChecks = await User.find(
//       { lastCheckedAt: { $ne: null } },
//       { email: 1, state: 1, isSeeded: 1, lastCheckedAt: 1 }
//     )
//       .sort({ lastCheckedAt: -1 })
//       .limit(10);

//     return res.json({
//       success: true,
//       data: {
//         totalUsers,
//         seedingStatus,
//         stateDistribution,
//         categoryDistribution,
//         totalCheckUsage,
//         topStatesByChecks,
//         recentChecks,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

export { loginAdmin, logoutAdmin, getAnalytics };
