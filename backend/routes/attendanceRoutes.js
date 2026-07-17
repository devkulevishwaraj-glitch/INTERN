const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getAttendance,
    getAttendanceByStudent,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

// Mark Attendance
router.post("/", markAttendance);

// Get All Attendance
router.get("/", getAttendance);

// Get Attendance By Student ID
router.get("/student/:studentId", getAttendanceByStudent);

// Update Attendance
router.put("/:id", updateAttendance);

// Delete Attendance
router.delete("/:id", deleteAttendance);

module.exports = router;