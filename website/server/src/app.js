const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Configure CORS to allow credentials
app.use(cors({
    origin: "http://localhost:3000",  // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true                 // Allow cookies to be sent
}));

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
