// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const { Messages } = require("../models/messageSchema");

router.post("/messages", async (req, res) => {
  try {
    const { chatId, sender, receiver, content } = req.body;

    const message = await Messages.create({
      chatId,
      sender,
      receiver,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    res
      .status(500)
      .json({ message: "Error creating message", error: error.message });
  }
});

module.exports = router;
