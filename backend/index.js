const { dbConnection } = require("./App/Db/db");
dbConnection();
require("dotenv").config();

const cors = require("cors");
const express = require("express");

const { userRouter } = require("./App/Routes/userRouter");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/ems", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is running on port: ", port);
});
