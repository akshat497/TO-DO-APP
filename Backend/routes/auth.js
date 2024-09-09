
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const userController = require("../controllers/userControllers");

// Route 1: Create a user
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  userController.createUser
);

// Route 2: User login
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "can't be blank").exists(),
  ],
  userController.loginUser
);

// Route 3: Fetch a user
router.post("/fetchuser", fetchuser, userController.fetchUser);

module.exports = router;
