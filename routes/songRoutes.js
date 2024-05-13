const express = require("express");
const { addSong } = require("../controllers/songController");
const upload = require("../middlewares/songUpload");
const router = express.Router();

router.route("/new").post(upload.single("songFile"), addSong);

module.exports = router;
