import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // stored in uploads folder
  originalName: { type: String, required: true }, // original uploaded name
  description: { type: String, required: true },
  fileUrl: { type: String, required: true }, // URL for frontend download
  title: { type: String }, // optional display title
  description: { type: String }, // optional description
  uploadedAt: { type: Date, default: Date.now }, // timestamp
});

const PDF = mongoose.model("PDF", pdfSchema);
export default PDF;
