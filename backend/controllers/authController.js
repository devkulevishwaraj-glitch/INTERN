const User = require("../models/user");
const Student = require("../models/studentmodel");
const Teacher = require("../models/teacher");
const generateToken = require("../utils/generateToken");

// ==========================================
// Register User
// ==========================================
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,

      // Student
      rollNo,
      department,
      semester,

      // Teacher
      employeeId,
    } = req.body;

    // ==========================================
    // Required Fields
    // ==========================================

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and role are required",
      });
    }

    // ==========================================
    // Validate Role
    // ==========================================

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // ==========================================
    // Restrict Admin Registration
    // ==========================================
    // Admin accounts cannot be created through
    // the public registration API.
    // Existing Admin accounts are not affected.

    if (role === "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Admin registration is not allowed. Please contact an existing administrator.",
      });
    }

    // ==========================================
    // Student Validation
    // ==========================================

    if (role === "student") {
      if (!rollNo || !department || !semester) {
        return res.status(400).json({
          success: false,
          message:
            "Roll number, department and semester are required",
        });
      }
    }

    // ==========================================
    // Teacher Validation
    // ==========================================

    if (role === "teacher") {
      if (!employeeId || !department) {
        return res.status(400).json({
          success: false,
          message:
            "Employee ID and department are required",
        });
      }
    }

    // ==========================================
    // Check Existing User
    // ==========================================

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ==========================================
    // Check Student Roll Number
    // ==========================================

    if (role === "student") {
      const existingStudent = await Student.findOne({
        rollNo,
      });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message:
            "A student with this roll number already exists",
        });
      }
    }

    // ==========================================
    // Check Teacher Employee ID
    // ==========================================

    if (role === "teacher") {
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
    }

    // ==========================================
    // Create User
    // ==========================================

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    try {
      // ==========================================
      // Create Student Profile
      // ==========================================

      if (role === "student") {
        await Student.create({
          userId: user._id,
          name,
          rollNo,
          department,
          semester: Number(semester),
          email,
        });
      }

      // ==========================================
      // Create Teacher Profile
      // ==========================================

      if (role === "teacher") {
        await Teacher.create({
          userId: user._id,
          name,
          employeeId,
          department,
          email,
        });
      }
    } catch (profileError) {
      // ==========================================
      // Rollback User
      // ==========================================

      await User.findByIdAndDelete(user._id);

      throw profileError;
    }

    // ==========================================
    // Generate Token
    // ==========================================

    const token = generateToken(
      user._id,
      user.role
    );

    // ==========================================
    // Response
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Registration successful",

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      token,
    });

  } catch (error) {
    console.log(
      "Registration Error:",
      error
    );

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// Login User
// ==========================================
exports.loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      !user ||
      !(await user.matchPassword(password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      success: true,

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      token,
    });

  } catch (error) {
    console.log(
      "Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// Get Logged-in User Profile
// ==========================================
exports.getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};