const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validateRequiredFields = require("../middleware/validationMiddleware");

// Public Routes
router.post("/register", validateRequiredFields(["name", "email", "password"]),
 registerUser
);

router.post(
  "/login",
  validateRequiredFields(["email", "password"]),
  loginUser
);

// Protected Route
router.get("/profile", protect, getUserProfile);

// Admin Only Route (Example)
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;