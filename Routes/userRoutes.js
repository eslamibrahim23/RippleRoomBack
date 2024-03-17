const express = require("express");
const userroutes = express.Router();
const {
  getalluser,
  getallchat,
  getuserbyid,
  deleteProfile,
  edituserProfile,
} = require("../controllers/userControllers");
const upload = require("../Middleware/upload");
userroutes.get("/profile/:id", getuserbyid);
userroutes.get("/users", getalluser);

userroutes.delete("/deleteProfile/:id", deleteProfile);
userroutes.patch("/editprofile/:id", upload.single("Image"), edituserProfile);
module.exports = userroutes;
