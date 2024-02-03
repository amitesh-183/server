const express = require("express");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
