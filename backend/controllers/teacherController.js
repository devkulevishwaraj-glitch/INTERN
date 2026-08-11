const Teacher = require("../models/teacher");
const User = require("../models/user");

// ==========================================
// Add Teacher
// ==========================================
const addTeacher = async (req, res) => {
    try {
        const {
            name,
            employeeId,
            department,
            email,
            password,
        } = req.body;

        // Password required
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required for teacher account",
            });
        }

        // Check email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "A user with this email already exists",
            });
        }

        // Check employee ID
        const existingTeacher = await Teacher.findOne({
            employeeId,
        });

        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message:
                    "A teacher with this employee ID already exists",
            });
        }

        // Create User Account
        const user = new User({
            name,
            email,
            password,
            role: "teacher",
        });

        await user.save();

        try {
            // Create Teacher Profile
            const teacher = await Teacher.create({
                userId: user._id,
                name,
                employeeId,
                department,
                email,
            });

            res.status(201).json({
                success: true,
                message: "Teacher added successfully",
                data: teacher,
            });

        } catch (teacherError) {
            // Rollback User if Teacher creation fails
            await User.findByIdAndDelete(user._id);

            throw teacherError;
        }

    } catch (error) {
        console.log("Add Teacher Error:", error);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get All Teachers
// ==========================================
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json({
            success: true,
            count: teachers.length,
            data: teachers,
        });

    } catch (error) {
        console.log("Get Teachers Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get Teacher By ID
// ==========================================
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        res.status(200).json({
            success: true,
            data: teacher,
        });

    } catch (error) {
        console.log("Get Teacher Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Update Teacher
// ==========================================
const updateTeacher = async (req, res) => {
    try {
        const {
            name,
            employeeId,
            department,
            email,
        } = req.body;

        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // Check Employee ID Conflict
        if (
            employeeId &&
            employeeId !== teacher.employeeId
        ) {
            const existingTeacher =
                await Teacher.findOne({
                    employeeId,
                    _id: { $ne: req.params.id },
                });

            if (existingTeacher) {
                return res.status(400).json({
                    success: false,
                    message:
                        "A teacher with this employee ID already exists",
                });
            }
        }

        // Check Email Conflict
        if (
            email &&
            email !== teacher.email &&
            teacher.userId
        ) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: teacher.userId },
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message:
                        "A user with this email already exists",
                });
            }
        }

        // Update Teacher
        teacher.name = name;
        teacher.employeeId = employeeId;
        teacher.department = department;
        teacher.email = email;

        await teacher.save();

        // Update Linked User
        if (teacher.userId) {
            await User.findByIdAndUpdate(
                teacher.userId,
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
            message: "Teacher updated successfully",
            data: teacher,
        });

    } catch (error) {
        console.log("Update Teacher Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Delete Teacher
// ==========================================
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // Delete Teacher Profile
        await Teacher.findByIdAndDelete(req.params.id);

        // Delete Linked User Account
        if (teacher.userId) {
            await User.findByIdAndDelete(teacher.userId);
        }

        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully",
        });

    } catch (error) {
        console.log("Delete Teacher Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Get Logged-in Teacher Profile
// ==========================================
const getTeacherProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        let teacher = null;

        // Find by User ID
        if (userId) {
            teacher = await Teacher.findOne({
                userId,
            });
        }

        // Fallback: Find by email
        if (!teacher && req.user?.email) {
            teacher = await Teacher.findOne({
                email: req.user.email,
            });
        }

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher profile not found",
            });
        }

        res.status(200).json({
            success: true,

            data: {
                id: teacher._id,
                userId: teacher.userId,
                name: teacher.name,
                employeeId: teacher.employeeId,
                department: teacher.department,
                email: teacher.email,
                role: "teacher",
            },
        });

    } catch (error) {
        console.log(
            "Get Teacher Profile Error:",
            error
        );

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
    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getTeacherProfile,
};