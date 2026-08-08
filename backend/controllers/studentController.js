const Student = require("../models/studentmodel");
const User = require("../models/User");
const Attendance = require("../models/Attendance");

// ==========================================
// Add Student
// ==========================================
const addStudent = async (req, res) => {
    try {
        const {
            name,
            rollNo,
            department,
            semester,
            email,
            password,
        } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required for student account",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "A user with this email already exists",
            });
        }

        const existingStudent = await Student.findOne({ rollNo });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "A student with this roll number already exists",
            });
        }

        // Create User Account
        const user = new User({
            name,
            email,
            password,
            role: "student",
        });

        await user.save();

        // Create Student Profile
        const student = new Student({
            userId: user._id,
            name,
            rollNo,
            department,
            semester,
            email,
        });

        try {
            await student.save();
        } catch (studentError) {
            await User.findByIdAndDelete(user._id);
            throw studentError;
        }

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: student,
        });

    } catch (error) {
        console.log("Add Student Error:", error);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get All Students
// ==========================================
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students,
        });

    } catch (error) {
        console.log("Get All Students Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get Student By ID
// ==========================================
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.status(200).json({
            success: true,
            data: student,
        });

    } catch (error) {
        console.log("Get Student Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Update Student
// ==========================================
const updateStudent = async (req, res) => {
    try {
        const {
            name,
            rollNo,
            department,
            semester,
            email,
        } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Check Roll Number Conflict
        if (rollNo && rollNo !== student.rollNo) {
            const existingStudent = await Student.findOne({
                rollNo,
                _id: { $ne: req.params.id },
            });

            if (existingStudent) {
                return res.status(400).json({
                    success: false,
                    message: "A student with this roll number already exists",
                });
            }
        }

        // Check Email Conflict
        if (email && email !== student.email) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: student.userId },
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "A user with this email already exists",
                });
            }
        }

        // Update Student
        student.name = name;
        student.rollNo = rollNo;
        student.department = department;
        student.semester = semester;
        student.email = email;

        await student.save();

        // Update Linked User
        if (student.userId) {
            await User.findByIdAndUpdate(
                student.userId,
                {
                    name,
                    email,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student,
        });

    } catch (error) {
        console.log("Update Student Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Delete Student
// ==========================================
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Delete Student Profile
        await Student.findByIdAndDelete(req.params.id);

        // Delete Linked User
        if (student.userId) {
            await User.findByIdAndDelete(student.userId);
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });

    } catch (error) {
        console.log("Delete Student Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Find Logged-in Student
// ==========================================
const findLoggedInStudent = async (req) => {
    let student = null;

    const userId = req.user?.id || req.user?._id;

    // Find using User ID
    if (userId) {
        student = await Student.findOne({
            userId,
        });
    }

    // Fallback: Find using email
    if (!student && req.user?.email) {
        student = await Student.findOne({
            email: req.user.email,
        });
    }

    return student;
};


// ==========================================
// Student Dashboard
// ==========================================
const getStudentDashboard = async (req, res) => {
    try {
        const student = await findLoggedInStudent(req);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found",
            });
        }

        const attendance = await Attendance.find({
            student: student._id,
        }).populate("subject");

        const totalAttendance = attendance.length;

        const presentDays = attendance.filter(
            (record) => record.status === "Present"
        ).length;

        const attendancePercentage =
            totalAttendance === 0
                ? 0
                : ((presentDays / totalAttendance) * 100).toFixed(2);

        const subjectIds = attendance
            .filter((record) => record.subject)
            .map((record) => record.subject._id.toString());

        const uniqueSubjectIds = [...new Set(subjectIds)];

        const totalSubjects = uniqueSubjectIds.length;

        res.status(200).json({
            success: true,

            student: {
                id: student._id,
                name: student.name,
                rollNo: student.rollNo,
                department: student.department,
                semester: student.semester,
                email: student.email,
            },

            attendancePercentage,
            presentDays,
            totalAttendance,
            totalSubjects,
        });

    } catch (error) {
        console.log("Student Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get Logged-in Student Profile
// ==========================================
const getStudentProfile = async (req, res) => {
    try {
        const student = await findLoggedInStudent(req);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found",
            });
        }

        res.status(200).json({
            success: true,

            data: {
                id: student._id,
                userId: student.userId,
                name: student.name,
                email: student.email,
                rollNo: student.rollNo,
                department: student.department,
                semester: student.semester,
                role: "student",
            },
        });

    } catch (error) {
        console.log("Get Student Profile Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Export
// ==========================================
module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentDashboard,
    getStudentProfile,
};