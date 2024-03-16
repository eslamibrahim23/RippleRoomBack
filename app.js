const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const connect = require("./dataBase/connectToDB");
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoutes");
const cors = require("cors");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { Chats } = require("./models/chatSchema");
const { Messages } = require("./models/messageSchema");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());
app.use(cors());
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/api", chatRoutes);
app.use("/message", messageRoutes);
const PORT = process.env.PORT || 3000;
const URL = process.env.URL_DATABASE;
console.log(process.env.URL_DATABASE);
///hena connection with server
io.on("connection", (socket) => {
  console.log("A user connected");

  /// hena chat l any user
  socket.on("chatMessage", async (data) => {
    try {
      // Save the message to the database
      const newMessage = new Messages({
        chatId: data.chatId,
        sender: data.sender,
        receiver: data.receiver,
        content: data.content,
      });
      await newMessage.save();

      //hena messages between el atneeen any 2 users
      io.to(data.sender).emit("chatMessage", newMessage);
      io.to(data.receiver).emit("chatMessage", newMessage);

      console.log("Message saved and broadcasted:", newMessage);
    } catch (error) {
      console.error("Error saving chat message:", error);
      // Handle error if necessary
    }
  });

  //hena ay chat hy creat
  socket.on("startChat", async (data) => {
    try {
      // Save the chat to the database
      const newChat = new Chats({
        sender: data.sender,
        receiver: data.receiver,
      });
      await newChat.save();

      console.log("Chat saved:", newChat);
    } catch (error) {
      console.error("Error saving chat:", error);
      // Handle error if necessary
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
console.log("hrloo");
connect(
  "mongodb://test:test@ac-ut3jk2b-shard-00-00.qntodh6.mongodb.net:27017,ac-ut3jk2b-shard-00-01.qntodh6.mongodb.net:27017,ac-ut3jk2b-shard-00-02.qntodh6.mongodb.net:27017/RIPPLEROOM?replicaSet=atlas-qpj10i-shard-0&ssl=true&authSource=admin"
);
console.log(PORT);

server.listen(7000, () => {
  console.log(`Server is running on port ${PORT}`, `http://localhost:7000/`);
});
