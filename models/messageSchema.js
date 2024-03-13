const mongoose = require("mongoose");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const messageSchema = new mongoose.Schema({
  //   chatId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Chat",
  //     required: true,
  //   },
  //   sender: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  //   receiver: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
