const jwt = require("jsonwebtoken");
const User = require('../models/UserModel');

async function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = { userId: user._id };
    console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ message: "Invalid token", success: false });
  }
}

module.exports = authMiddleware;
