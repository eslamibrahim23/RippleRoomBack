const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connect = require("./dataBase/connectToDB");
const PORT = process.env.PORT || 5000;

app.use(express.json());

const authRoute = require("./Routes/authRoute");
app.use("/users", authRoute);
app.use(express.json());

const User = require("./models/userSchema");
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (eror) {
    console.log(eror);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

connect();
app.listen(PORT, () => {
  console.log(PORT, "server is running..");
});
