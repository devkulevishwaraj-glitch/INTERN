const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

module.exports = router;