const User = require("../models/User");

const register = (req, res) => {
  res.send({ msg: "successfully registered" });
  const { email, username, password } = req.body;
  User.create({ email, username, password });
};
const login = async (req, res) => {
  res.send({ msg: "successfully login" });
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "Missing fields" });

  // Simple validation
  if (username.length < 5 || password.length < 6) {
    return res.status(400).json({
      msg: "Username and password must be at least 5 and 6 characters long, respectively.",
    });
  } else if (
    User.findOne(password) !== password ||
    User.findOne(username) !== username
  ) {
    return res.status(400).json({ msg: "Incorrect username or password" });
  }
  return res.status(400).json({ msg: "Successfully logged In" });
};
const logout = (req, res) => {
  res.send({ msg: "successfully logout" });
};

module.exports = {
  register,
  login,
  logout,
};
