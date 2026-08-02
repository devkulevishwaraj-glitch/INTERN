const User = require("../models/User");
const Student = require("../models/studentmodel");
const generateToken = require("../utils/generateToken");

// @desc   Register a new user
// @route  POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Automatically create Student record if role is student
    if (role === "student") {
      await Student.create({
        userId: user._id,
        name,
        email,
        rollNo: `TEMP${Date.now()}`,
        department: "Not Assigned",
        semester: 1,
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// @desc   Get logged in user profile
// @route  GET /api/auth/profile
exports.getUserProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};