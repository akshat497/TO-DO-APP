const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");
const JWT_SECRET = config.JWT_SECRET;
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "plz authenticate using valid token" });
  }
  try {
    const decodedData = jwt.verify(token, JWT_SECRET); // Verify token and get decoded data
    const user = await User.findById(decodedData.id); // Find user by ID in the database

    if (!user) {
      return errorResponse(res, "User not found. Please authenticate again.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = fetchuser;
