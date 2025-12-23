import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    totalSignups: {
      type: Number,
      default: 0,
    },

    totalSeedingChecks: {
      type: Number,
      default: 0,
    },

    seededCount: {
      type: Number,
      default: 0,
    },

    notSeededCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const analyticsModel =
  mongoose.model.Analytics || mongoose.model("Analytics", analyticsSchema);

export default analyticsModel;
