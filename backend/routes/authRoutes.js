const express = require("express");
const router = express.Router();
 // Log the router stack to see the registered routes

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const  protect  = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validateRequiredFields = require("../middleware/validationMiddleware");

// Register
router.post(
  "/register",
  validateRequiredFields(["name", "email", "password"]),
  registerUser
);

// Login
router.post(
  "/login",
  validateRequiredFields(["email", "password"]),
  loginUser
);

// Profile
router.get("/profile", protect, getUserProfile);

// Admin
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});



module.exports = router;