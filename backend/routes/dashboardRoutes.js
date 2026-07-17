const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getTotalStudents,
    getTotalTeachers,
    getTodayAttendance,
    getAttendancePercentage
} = require("../controllers/dashboardController");

// Dashboard Statistics
router.get("/", getDashboardStats);

// Total Students
router.get("/students", getTotalStudents);

// Total Teachers
router.get("/teachers", getTotalTeachers);

// Today's Attendance
router.get("/today", getTodayAttendance);

// Attendance Percentage
router.get("/percentage", getAttendancePercentage);

module.exports = router;