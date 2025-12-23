import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: false,
    },

    // Additional profile info
    state: {
      type: String,
      required: false,
    },

    city: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: false,
    },

    // Seeding check-related fields
    isSeeded: {
      type: Boolean,
      default: false, // null = user hasn't checked yet
    },

    checkCount: {
      type: Number,
      default: 0,
    },

    lastCheckedAt: {
      type: Date,
    },

    isSubscribedToEmail: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
