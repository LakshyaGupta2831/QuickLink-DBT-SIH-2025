import nodemailer from "nodemailer";
import { config } from "dotenv";
config(); // MUST be at the very top

// Configure SMTP transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail", // or any SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password if using Gmail
  },
});

// Send email function
export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    headers: {
      "X-Priority": "1",
      Importance: "High", // marks email as important
    },
  };

  return transporter.sendMail(mailOptions);
};
