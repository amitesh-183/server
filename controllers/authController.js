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
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "Missing fields" });

  try {
    const user = await User.findOne({ username }); // Find the user by username
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare provided password with hashed password stored in the database
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
