const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // Expected format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  
  
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user data (like userId) to req
    next(); // Continue to next middleware/controller
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
