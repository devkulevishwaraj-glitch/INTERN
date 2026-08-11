const Attendance = require("../models/attendance");
const Student = require("../models/studentmodel");

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            data: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Attendance
const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("student")
            .populate("subject");

        res.status(200).json({
            success: true,
            count: attendance.length,
            data: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Logged-in Student Attendance
const getMyAttendance = async (req, res) => {
    try {
        let student = null;

        // Get logged-in user ID
        const userId = req.user?.id || req.user?._id;

        // Find student using User ID
        if (userId) {
            student = await Student.findOne({
                userId: userId
            });
        }

        // Fallback: Find student using email
        if (!student && req.user?.email) {
            student = await Student.findOne({
                email: req.user.email
            });
        }

        // Student not found
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Get only this student's attendance
        const attendance = await Attendance.find({
            student: student._id
        })
            .populate("student")
            .populate("subject");

        res.status(200).json({
            success: true,
            count: attendance.length,
            data: attendance
        });

    } catch (error) {
        console.log("Get My Attendance Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Attendance By Student
const getAttendanceByStudent = async (req, res) => {
    try {
        const attendance = await Attendance.find({
            student: req.params.studentId
        })
            .populate("student")
            .populate("subject");

        res.status(200).json({
            success: true,
            count: attendance.length,
            data: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update Attendance
const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Attendance updated successfully",
            data: attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(
            req.params.id
        );

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    markAttendance,
    getAttendance,
    getMyAttendance,
    getAttendanceByStudent,
    updateAttendance,
    deleteAttendance
};