const Student = require("../models/studentmodel");
const Attendance = require("../models/Attendance");

// Add Student
const addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Student By ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Student Dashboard
const getStudentDashboard = async (req, res) => {
    try {
        // Find student by logged-in user's email
        const student = await Student.findOne({
            email: req.user.email
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const attendance = await Attendance.find({
            student: student._id
        }).populate("subject");

        const totalAttendance = attendance.length;

        const presentDays = attendance.filter(
            (record) => record.status === "Present"
        ).length;

        const attendancePercentage =
            totalAttendance === 0
                ? 0
                : ((presentDays / totalAttendance) * 100).toFixed(2);

        const uniqueSubjects = [
            ...new Set(
                attendance
                    .filter(record => record.subject)
                    .map(record => record.subject._id.toString())
            )
        ];

        res.status(200).json({
            success: true,
            attendancePercentage,
            presentDays,
            totalSubjects: uniqueSubjects.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentDashboard
};