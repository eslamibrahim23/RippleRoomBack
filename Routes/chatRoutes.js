// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { Chats } = require("../models/chatSchema");
const { createChat, gatAllChats } = require("../controllers/chatController");
// Route to create a new chat
router.post("/newchat", createChat);
router.get("/allChats", gatAllChats);

module.exports = router;
