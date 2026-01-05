import express from "express";
import bcrypt from "bcrypt";

// ✅ USE BACKEND MODELS (NOT NPCI)
import OTP from "../models/otpModel.js";
import mapperModel from "../models/mapperModel.js";
import { sendEmail } from "../lib/mail.js";

const otpRouter = express.Router();

// 🔐 helper
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// =======================
// SEND OTP
// =======================
otpRouter.post("/send-otp", async (req, res) => {
  try {
    console.log("send otp req received");
    const { aadhar } = req.body;

    if (!aadhar) {
      return res.status(400).json({ message: "Aadhar required", success: false });
    }

    // 🔍 Find mapping
    const mapping = await mapperModel.findOne({ aadharNumber: aadhar });

    // -------------------------
    // 🧪 DEV MODE (MOCK OTP)
    // -------------------------
    if (!mapping) {
      const mockOtp = "123456";
      const hashedOtp = await bcrypt.hash(mockOtp, 10);

      await OTP.create({
        email: "mock@local.dev",
        otp: hashedOtp,
        expiresAt: Date.now() + 2 * 60 * 1000,
      });

      console.log("⚠️ MOCK OTP GENERATED:", mockOtp);

      return res.json({
        success: true,
        message: "OTP sent successfully (mock mode)",
      });
    }

    // -------------------------
    // ✅ REAL FLOW
    // -------------------------
    const email = mapping.registeredEmail;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "No registered email found for this Aadhaar",
      });
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: Date.now() + 2 * 60 * 1000,
    });

    await sendEmail({
      to: email,
      subject: "Your OTP Code for Aadhaar Verification",
      text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// =======================
// VERIFY OTP
// =======================
otpRouter.post("/verify-otp", async (req, res) => {
  try {
    const { aadhar, otp } = req.body;

    if (!aadhar || !otp) {
      return res.status(400).json({
        success: false,
        message: "Aadhar and OTP required",
      });
    }

    const mapping = await mapperModel.findOne({ aadharNumber: aadhar });

    // 👇 same email used in mock
    const email = mapping ? mapping.registeredEmail : "mock@local.dev";

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or already used",
      });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isValid = await bcrypt.compare(otp, record.otp);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await OTP.deleteOne({ _id: record._id });

    res.json({
      success: true,
      message: "OTP verified successfully",
      user: mapping || { aadharNumber: aadhar },
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default otpRouter;
