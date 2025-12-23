import express from "express";
import User from "../models/userModel.js"; // your user schema
import { sendEmail } from "../lib/mail.js";

const emailRouter = express.Router();

// POST /api/send-alert-email
emailRouter.post("/send-alert-email", async (req, res) => {
  const { subject, body } = req.body;

  if (!subject || !body) {
    return res
      .status(400)
      .json({ success: false, message: "Subject and body are required" });
  }

  try {
    // Fetch all users who have not seeded
    const users = await User.find(
      { isSeeded: { $ne: true } },
      { email: 1, _id: 0 }
    );

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found to send email" });
    }

    // Send email to each user individually
    for (const user of users) {
      await sendEmail({
        to: user.email,
        subject,
        text: body,
      });
    }

    res.json({
      success: true,
      message: `Email sent to ${users.length} users.`,
    });
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default emailRouter;
