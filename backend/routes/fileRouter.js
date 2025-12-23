import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import pdfUpload from "../lib/pdfUpload.js";
import PDF from "../models/pdfModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileRouter = express.Router();

// GET /api/files
fileRouter.get("/files", async (req, res) => {
  const files = await PDF.find().sort({ uploadedAt: -1 }); // newest first
  res.json({ success: true, files });
});

// POST /api/upload — receive PDF from admin and save
fileRouter.post("/upload", pdfUpload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    // Save metadata to MongoDB
    const pdf = await PDF.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileUrl,
      title: req.body.title || req.file.originalname,
      description: req.body.description || "",
    });

    return res.json({
      success: true,
      message: "PDF uploaded successfully",
      pdf,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// GET /api/download/:id
fileRouter.get("/download/:id", async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  if (!pdf)
    return res.status(404).json({ success: false, message: "File not found" });

  // send the actual file
  const filePath = path.join(__dirname, "..", "uploads", pdf.filename);
  res.download(filePath, pdf.originalName); // triggers browser download
});

// DELETE /api/file/:id
fileRouter.delete("/delete/:id", async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  if (!pdf)
    return res.status(404).json({ success: false, message: "PDF not found" });

  // delete file from server
  const filePath = path.join(__dirname, "..", "uploads", pdf.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  // delete from MongoDB
  await PDF.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "PDF deleted successfully" });
});

export default fileRouter;
