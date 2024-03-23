const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddlewares");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ msg: "Protected route", user: req.user });
});
module.exports = router;
