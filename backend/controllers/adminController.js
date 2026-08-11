const Student = require("../models/studentmodel");
const Teacher = require("../models/teacher");
const Subject = require("../models/subject");
const Attendance = require("../models/attendance");

// @desc    Dashboard Summary
// @route   GET /api/admin/dashboard
// @access  Protected (Admin)

const getDashboardStats = async (req, res) => {
  try {
    // Total Counts
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    // Aggregation: Present & Absent Count
    const attendanceStats = await Attendance.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let presentCount = 0;
    let absentCount = 0;

    attendanceStats.forEach((item) => {
      if (item._id === "Present") {
        presentCount = item.count;
      } else if (item._id === "Absent") {
        absentCount = item.count;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalSubjects,
        totalAttendance,
        presentCount,
        absentCount
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};