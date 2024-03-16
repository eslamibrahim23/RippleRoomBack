// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { Chats } = require("../models/chatSchema");
// Route to create a new chat
router.post("/chats", async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    // Create a new chat
    const chat = await Chats.create({ sender, receiver });

    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res
      .status(500)
      .json({ message: "Error creating chat", error: error.message });
  }
});

module.exports = router;
