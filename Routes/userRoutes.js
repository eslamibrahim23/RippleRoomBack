const express = require("express");
const userroutes = express.Router();
const { getalluser, getallchat } = require("../controllers/userControllers");

userroutes.get("/users", getalluser);
userroutes.get("/chats", getallchat);
module.exports = userroutes;
