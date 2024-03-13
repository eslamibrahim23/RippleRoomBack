const express = require("express");
const userroutes = express.Router();
const { getalluser } = require("../controllers/userControllers");

userroutes.get("/users", getalluser);
module.exports = userroutes;
