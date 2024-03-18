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

/// hena get user between 2 user
const getChatTwoUser = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const chats = await Chats.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .populate("sender", `userName Image Bio Email `)
      .populate("receiver", "userName Image Bio Email")
      .select("sender receiver createdAt");
    res.status(200).json(chats);
  } catch (error) {
    console.log(" f error hena y samah m3ml4 fetch ll chat");
    res.status(500).json({ error: error.message });
  }
};

//hena b2q delete chat between 2 users
const chatDeleted = async (req, res) => {
  try {
    const { id } = req.params;
    const chatDeleted = await Chats.findByIdAndDelete(id);
    if (!chatDeleted) {
      res.status(404).json("Sorry but this chat not found");
    }
    res.status(200).json("You deleted this chat Now");
  } catch (error) {
    console.log("y samah 7sl kda error f deleted el chat");
    res.status(500).json({ error: error.message });
  }
};
///////////////// here part of grouChat
const createGroup = async (req, res) => {
  try {
    const { groupName, members } = req.body;
    const groupAdmin = req.params.id;
    const newGroup = new Chats({
      members,
      groupName,
      groupAdmin,
      groupAdmin,
      groupChat: true,
    });
    await newGroup.save();
    res.status(200).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/////// getAllGroups
const getAllGroups = async (req, res) => {
  try {
    const { id } = req.params;
    const myGroups = await Chats.find({
      $or: [{ members: { $in: [id] } }, { groupAdmin: id }],
      groupChat: true,
    })
      .populate("groupAdmin", "userName Image Bio Email")
      .populate("members", "userName Bio Image Email");

    res.status(200).json(myGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createChat,
  gatAllChats,
  getChatTwoUser,
  chatDeleted,
  createGroup,
  getAllGroups,
};
