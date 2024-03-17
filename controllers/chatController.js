const { Chats } = require("../models/chatSchema");

// hena hn3ml create l new chat
const createChat = async (req, res) => {
  try {
    console.log("new chat hena b2a");
    const { sender, receiver } = req.body;
    const chat = new Chats({ sender, receiver });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// hena get all chats
const gatAllChats = async (req, res) => {
  try {
    const chats = await Chats.find();
    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching Chats:", error);
    res
      .status(500)
      .json({ message: "Error fetching Chats", error: error.message });
  }
};
module.exports = { createChat, gatAllChats };
