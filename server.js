const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Middlewares

app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// MongoDB Connect

mongoDB(process.env.MONGODB_CONNECT);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
