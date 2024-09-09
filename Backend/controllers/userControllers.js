
const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler"); // Import the response handler
const config = require("../config/config");

const JWT_SECRET = config.JWT_SECRET;

// Controller function for creating a user
exports.createUser = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return errorResponse(res, "Validation failed", result.array(), 400);
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return errorResponse(res, "User already exists", {}, 400);
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    });

    const data = { id: user.id };
    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

    return successResponse(
      res,
      "User created successfully",
      { authtoken },
      200
    );
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message);
  }
};

// Controller function for user login
exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation failed", errors.array(), 400);
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid credentials", {}, 400);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return errorResponse(res, "Invalid credentials", {}, 400);
    }

    const data = { id: user.id };
    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

    return successResponse(res, "Login successful", { authtoken }, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message);
  }
};

// Controller function for fetching a user
exports.fetchUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId.id).select("-password");
    return successResponse(res, "User fetched successfully", user, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", error.message);
  }
};
