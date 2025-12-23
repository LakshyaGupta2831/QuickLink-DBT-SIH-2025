import express from "express";
import Message from "../models/messageModel.js";

const messageRouter = express.Router();

// GET all messages
messageRouter.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new message (max 3 messages)
messageRouter.post("/messages", async (req, res) => {
  try {
    const count = await Message.countDocuments();
    if (count >= 3) {
      return res
        .status(400)
        .json({ success: false, message: "Max 3 messages allowed" });
    }

    const message = await Message.create({ text: req.body.text });
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE message
messageRouter.delete("/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default messageRouter;
