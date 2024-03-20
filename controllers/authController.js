const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ email, username, password: hashedPassword });
    await user.save(); // Save the user to the database
    res.send({ msg: "successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body; // Assuming 'identifier' can be either username or email
  if (!identifier || !password)
    // Check for missing fields
    return res.status(400).json({ msg: "Missing fields" });

  try {
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

    res.status(200).json({ msg: "Successfully logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
