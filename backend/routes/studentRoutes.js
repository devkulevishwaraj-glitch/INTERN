const express = require("express");
const router = express.Router();

const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentDashboard,
    getStudentProfile,
} = require("../controllers/studentController");

const  protect  = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


// ==========================================
// Student Dashboard
// ==========================================

router.get(
    "/dashboard",
    protect,
    authorize("student"),
    getStudentDashboard
);


// ==========================================
// Logged-in Student Profile
// ==========================================

router.get(
    "/profile",
    protect,
    authorize("student"),
    getStudentProfile
);


// ==========================================
// Student Management
// ==========================================

// Add a new student
router.post(
    "/",
    addStudent
);

// Get all students
router.get(
    "/",
    getAllStudents
);

// Get a student by ID
router.get(
    "/:id",
    getStudentById
);

// Update a student by ID
router.put(
    "/:id",
    updateStudent
);

// Delete a student by ID
router.delete(
    "/:id",
    deleteStudent
);


module.exports = router;