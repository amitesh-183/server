const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set upload destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set file name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
