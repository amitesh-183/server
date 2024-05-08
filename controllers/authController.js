const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    await user.save(); // Save the user to the database
    res.status(201).send({ msg: "successfully new User registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body; // Assuming 'identifier' can be either username or email

  try {
    // Check for missing fields
    if (!identifier || !password)
      return res.status(400).json({ msg: "Missing fields" });

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }], // Check both username and email
    });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare password with hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // If authentication is successful
    const token = generateToken({ userId: user._id });
    res
      .status(200)
      .json({ token, msg: "Successfully logged in", name: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
const logout = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
