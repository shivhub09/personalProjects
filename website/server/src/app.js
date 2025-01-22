const express = require("express");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // Replace with your client origin
  credentials: true, // Allow cookies or other credentials
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static("public"));

app.use(cookieParser());

const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const promoterRouter = require("./routes/promoter.routes");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/promoter", promoterRouter);

module.exports = app;
