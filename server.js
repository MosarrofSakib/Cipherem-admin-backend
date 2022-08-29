const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute");
const mailRoute = require("./Routes/mailRoute");

const app = express();
const port = 8000;

app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",

    "http://localhost:3000"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/mail", mailRoute);

app.listen(port, () => {
  console.log("Server Running on " + `http://localhost:${port}`);
});
