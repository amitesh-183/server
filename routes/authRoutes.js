const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddlewares");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ msg: "Protected route", user: req.user });
});
module.exports = router;
