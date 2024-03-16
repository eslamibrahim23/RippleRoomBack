const { Users } = require("../models/userSchema");
const { Chats } = require("../models/chatSchema");

getalluser = async (req, res, next) => {
  try {
    const users = await Users.find().select("firstName Email");
    res.json(users);
  } catch (error) {
    console.log("San not to fetch users", error);
    res.status(500).json({ error: "Can not fetch all users" });
  }
};
// show all chats
getallchat = async (req, res, next) => {
  try {
    const chats = await Chats.find();
    console.log("samah");
    res.json(chats);
  } catch (error) {
    console.log("San not to fetch users", error);
    res.status(500).json({ error: "Can not fetch all chats" });
  }
};
module.exports = { getalluser, getallchat };
