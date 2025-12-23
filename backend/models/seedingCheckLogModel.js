import mongoose from "mongoose";

const seedingCheckLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    checkResult: {
      type: Boolean, // true = seeded, false = not seeded
      required: true,
    },

    checkedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SeedingCheckLogModel =
  mongoose.model.SeedingCheckLog ||
  mongoose.model("SeedingCheckLog", seedingCheckLogSchema);

export default SeedingCheckLogModel;
