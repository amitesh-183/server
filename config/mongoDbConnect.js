const mongoose = require("mongoose");

const createConnection = (mongodbUri) => {
  mongoose
    .connect(mongodbUri)
    .then(() => console.log("Successfully mongoDB"))
    .catch((err) => console.log(err));
};
module.exports = createConnection;
