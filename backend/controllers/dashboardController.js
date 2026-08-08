const Student = require("../models/studentmodel");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Attendance = require("../models/Attendance");


// ==========================================
// Dashboard Statistics
// ==========================================
const getDashboardStats = async (req, res) => {
    try {

        // ==========================================
        // ADMIN DASHBOARD
        // ==========================================

        if (req.user.role === "admin") {

            const totalStudents =
                await Student.countDocuments();

            const totalTeachers =
                await Teacher.countDocuments();

            const totalSubjects =
                await Subject.countDocuments();

            const totalAttendance =
                await Attendance.countDocuments();

            const presentStudents =
                await Attendance.countDocuments({
                    status: "Present",
                });

            const attendancePercentage =
                totalAttendance === 0
                    ? 0
                    : (
                        (presentStudents /
                            totalAttendance) *
                        100
                    ).toFixed(2);

            return res.status(200).json({
                success: true,
                role: "admin",
                totalStudents,
                totalTeachers,
                totalSubjects,
                totalAttendance,
                attendancePercentage,
            });
        }


        // ==========================================
        // TEACHER DASHBOARD
        // ==========================================

        if (req.user.role === "teacher") {

            const userId =
                req.user?.id || req.user?._id;

            // Find teacher
            let teacher = null;

            if (userId) {
                teacher = await Teacher.findOne({
                    userId,
                });
            }

            // Fallback email
            if (!teacher && req.user?.email) {
                teacher = await Teacher.findOne({
                    email: req.user.email,
                });
            }

            // Teacher profile doesn't exist
            if (!teacher) {

                return res.status(200).json({
                    success: true,
                    role: "teacher",
                    totalStudents: 0,
                    totalSubjects: 0,
                    totalAttendance: 0,
                    attendancePercentage: 0,
                });
            }


            // ==========================================
            // Teacher's Subjects
            // ==========================================

            const subjects = await Subject.find({
                teacherId: teacher._id,
            });

            const totalSubjects = subjects.length;


            // ==========================================
            // Teacher's Attendance
            // ==========================================

            const attendance = await Attendance.find({
                teacher: teacher._id,
            });

            const totalAttendance =
                attendance.length;


            // ==========================================
            // Present Attendance
            // ==========================================

            const presentStudents =
                attendance.filter(
                    (record) =>
                        record.status === "Present"
                ).length;


            // ==========================================
            // Attendance Percentage
            // ==========================================

            const attendancePercentage =
                totalAttendance === 0
                    ? 0
                    : (
                        (presentStudents /
                            totalAttendance) *
                        100
                    ).toFixed(2);


            // ==========================================
            // Students handled by this teacher
            // ==========================================

            const studentIds = [
                ...new Set(
                    attendance
                        .filter(
                            (record) =>
                                record.student
                        )
                        .map(
                            (record) =>
                                record.student.toString()
                        )
                ),
            ];

            const totalStudents =
                studentIds.length;


            return res.status(200).json({
                success: true,
                role: "teacher",
                totalStudents,
                totalSubjects,
                totalAttendance,
                attendancePercentage,
            });
        }


        // ==========================================
        // STUDENT
        // ==========================================

        return res.status(403).json({
            success: false,
            message: "Dashboard not available for this role",
        });

    } catch (error) {

        console.log(
            "Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Total Students
// ==========================================
const getTotalStudents = async (req, res) => {
    try {

        const totalStudents =
            await Student.countDocuments();

        res.status(200).json({
            success: true,
            totalStudents,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Total Teachers
// ==========================================
const getTotalTeachers = async (req, res) => {
    try {

        const totalTeachers =
            await Teacher.countDocuments();

        res.status(200).json({
            success: true,
            totalTeachers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Today's Attendance
// ==========================================
const getTodayAttendance = async (req, res) => {
    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        };

        // Teacher-specific attendance
        if (req.user.role === "teacher") {

            const userId =
                req.user?.id || req.user?._id;

            const teacher =
                await Teacher.findOne({
                    $or: [
                        { userId },
                        { email: req.user.email },
                    ],
                });

            if (teacher) {
                filter.teacher = teacher._id;
            } else {
                return res.status(200).json({
                    success: true,
                    total: 0,
                    data: [],
                });
            }
        }

        const attendance =
            await Attendance.find(filter);

        res.status(200).json({
            success: true,
            total: attendance.length,
            data: attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// Attendance Percentage
// ==========================================
const getAttendancePercentage = async (req, res) => {
    try {

        const filter = {};

        // Teacher-specific
        if (req.user.role === "teacher") {

            const userId =
                req.user?.id || req.user?._id;

            const teacher =
                await Teacher.findOne({
                    $or: [
                        { userId },
                        { email: req.user.email },
                    ],
                });

            if (!teacher) {
                return res.status(200).json({
                    success: true,
                    attendancePercentage: 0,
                });
            }

            filter.teacher = teacher._id;
        }

        const totalAttendance =
            await Attendance.countDocuments(filter);

        const presentStudents =
            await Attendance.countDocuments({
                ...filter,
                status: "Present",
            });

        const percentage =
            totalAttendance === 0
                ? 0
                : (
                    (presentStudents /
                        totalAttendance) *
                    100
                ).toFixed(2);

        res.status(200).json({
            success: true,
            attendancePercentage: percentage,
        });

    } catch (error) {

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
    getDashboardStats,
    getTotalStudents,
    getTotalTeachers,
    getTodayAttendance,
    getAttendancePercentage,
};