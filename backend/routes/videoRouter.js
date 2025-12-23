import express from "express";
import Video from "../models/videoModel.js";
const videoRouter = express.Router();

videoRouter.get("/all", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      message: "Videos fetched successfully",
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

videoRouter.post("/upload", async (req, res) => {
  try {
    const { title, description, videoId, duration, thumbnail } = req.body;

    if (!title || !description || !videoId) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newVideo = new Video({
      title,
      description,
      videoId,
      duration,
      thumbnail, // optional, auto-generated if not provided
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video added successfully",
      data: newVideo,
    });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ message: "Server error", error });
  }
  // Logic to handle video upload
  //   res.json({ success: true, message: "Video uploaded successfully" });
});

videoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Video deleted successfully",
      deletedVideo,
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default videoRouter;
