const express = require("express");
require("dotenv").config();
const connect = require("./dataBase/connectToDB");
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use("/", authRoute);
app.use("/user", userRoute);
const PORT = process.env.PORT || 3000;
const URL = process.env.URL_DATABASE;
console.log(process.env.URL_DATABASE);

connect(
  "mongodb://test:test@ac-ut3jk2b-shard-00-00.qntodh6.mongodb.net:27017,ac-ut3jk2b-shard-00-01.qntodh6.mongodb.net:27017,ac-ut3jk2b-shard-00-02.qntodh6.mongodb.net:27017/RIPPLEROOM?replicaSet=atlas-qpj10i-shard-0&ssl=true&authSource=admin"
);
console.log(PORT);

app.listen(7000, () => {
  console.log(`Server is running on port ${PORT}`, `http://localhost:7000/`);
});
