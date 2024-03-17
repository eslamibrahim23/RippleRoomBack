const mongoose = require("mongoose");
const { Users } = require("../models/userSchema");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  groupChat: {
    type: Boolean,
    default: false,
  },
  groupName: {
    type: String,
    default: null,
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chats = mongoose.model(`chat`, chatSchema);
module.exports = { Chats };
