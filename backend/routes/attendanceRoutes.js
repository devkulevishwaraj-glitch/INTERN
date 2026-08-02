const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getAttendance,
    getMyAttendance,
    getAttendanceByStudent,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");
const  authorize  = require("../middleware/roleMiddleware");

// Mark Attendance (Teacher/Admin)
router.post("/", protect, authorize("teacher", "admin"), markAttendance);

// Get Logged-in Student Attendance
router.get("/my", protect, authorize("student"), getMyAttendance);

// Get All Attendance (Admin/Teacher)
router.get("/", protect, authorize("admin", "teacher"), getAttendance);

// Get Attendance By Student ID (Admin/Teacher)
router.get(
    "/student/:studentId",
    protect,
    authorize("admin", "teacher"),
    getAttendanceByStudent
);

// Update Attendance (Admin/Teacher)
router.put(
    "/:id",
    protect,
    authorize("admin", "teacher"),
    updateAttendance
);

// Delete Attendance (Admin Only)
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteAttendance
);

module.exports = router;