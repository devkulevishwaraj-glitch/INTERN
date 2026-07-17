const Student = require("../models/studentmodel");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalAttendance = await Attendance.countDocuments();

        res.status(200).json({
            success: true,
            totalStudents,
            totalTeachers,
            totalAttendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Total Students
const getTotalStudents = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();

        res.status(200).json({
            success: true,
            totalStudents
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Total Teachers
const getTotalTeachers = async (req, res) => {
    try {
        const totalTeachers = await Teacher.countDocuments();

        res.status(200).json({
            success: true,
            totalTeachers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Today's Attendance
const getTodayAttendance = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.find({
            date: { $gte: today }
        });

        res.status(200).json({
            success: true,
            total: attendance.length,
            data: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Attendance Percentage
const getAttendancePercentage = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const presentStudents = await Attendance.countDocuments({
            status: "Present"
        });

        const percentage =
            totalStudents === 0
                ? 0
                : ((presentStudents / totalStudents) * 100).toFixed(2);

        res.status(200).json({
            success: true,
            attendancePercentage: `${percentage}%`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getTotalStudents,
    getTotalTeachers,
    getTodayAttendance,
    getAttendancePercentage
};