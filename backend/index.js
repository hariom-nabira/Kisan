const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const { cookieAuthentication } = require("./utils/cookieAuth");

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieAuthentication("token"));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", authRoutes);

app.listen(PORT, console.log(`Server started at PORT: ${PORT}`));