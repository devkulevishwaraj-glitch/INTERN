const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getTotalStudents,
    getTotalTeachers,
    getTodayAttendance,
    getAttendancePercentage,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

// ==========================================
// Dashboard Statistics
// ==========================================

router.get(
    "/",
    protect,
    getDashboardStats
);


// ==========================================
// Total Students
// ==========================================

router.get(
    "/students",
    protect,
    getTotalStudents
);


// ==========================================
// Total Teachers
// ==========================================

router.get(
    "/teachers",
    protect,
    getTotalTeachers
);


// ==========================================
// Today's Attendance
// ==========================================

router.get(
    "/today",
    protect,
    getTodayAttendance
);


// ==========================================
// Attendance Percentage
// ==========================================

router.get(
    "/percentage",
    protect,
    getAttendancePercentage
);


module.exports = router;