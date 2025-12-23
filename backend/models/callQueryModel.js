import mongoose from "mongoose";

const callQuerySchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    callTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "called", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const CallQuery =
  mongoose.models.CallQuery || mongoose.model("CallQuery", callQuerySchema);

export default CallQuery;
