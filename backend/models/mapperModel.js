import mongoose from "mongoose";
const mapperSchema = mongoose.Schema(
  {
    aadharNumber: { type: String, required: true },
    iin: { type: String, required: true }, // unique bank identifier
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    bankStatus: { type: String, required: true },
    seedingStatus: { type: Boolean, required: true, default: false },
    registeredEmail: { type: String, required: false },
    registeredPhone: { type: String, required: false },
    lastUpdated: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const mapperModel =
  mongoose.model.mapper || mongoose.model("mapper", mapperSchema);

export default mapperModel;
