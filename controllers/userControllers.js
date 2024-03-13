const { Users } = require("../models/userSchema");

getalluser = async (req, res, next) => {
  try {
    const users = await Users.find().select("firstName Email");
    res.json(users);
  } catch (error) {
    console.log("San not to fetch users", error);
    res.status(500).json({ error: "Can not fetch all users" });
  }
};
module.exports = { getalluser };
