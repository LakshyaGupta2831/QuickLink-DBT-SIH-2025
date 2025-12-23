import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    // Auto-generated _id by MongoDB

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // For YouTube videos, you’ll store only videoId (like "dQw4w9WgXcQ")
    videoId: {
      type: String,
      required: true,
    },

    // Optional: store thumbnail URL (backend can also auto-generate based on videoId)
    thumbnail: {
      type: String,
      default: function () {
        return `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
      },
    },

    duration: {
      type: String, // "5:30"
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
