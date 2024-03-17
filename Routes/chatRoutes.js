// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { Chats } = require("../models/chatSchema");
const {
  createChat,
  gatAllChats,
  getChatTwoUser,
  chatDeleted,
} = require("../controllers/chatController");
// Route to create a new chat
router.post("/newchat", createChat);
router.get("/allChats", gatAllChats);
router.get("/chatTwoUsers/:senderId/:receiverId", getChatTwoUser);
router.delete("/deleteChat/:id", chatDeleted);

module.exports = router;
