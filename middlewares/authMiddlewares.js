// authMiddleware.js

const { verifyToken } = require("../utils/jwtUtils");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}

module.exports = { authenticateToken };
