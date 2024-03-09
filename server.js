const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const mongoDB = require("./config/mongoDbConnect.js");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");

const app = express();
const port = process.env.PORT || 4000;

// Middlewares

app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use("/api/auth", authRoutes);
// app.use("/api/songs", songRoutes);

// MongoDB Connect

mongoDB(process.env.MONGODB_CONNECT);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
