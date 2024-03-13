const mongoose = require("mongoose");
const { Users } = require("../models/userSchema");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chats = mongoose.model(`chat`, chatSchema);
module.exports = { Chats };
