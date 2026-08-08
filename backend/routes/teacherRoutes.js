const express = require("express");
const router = express.Router();

const {
    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    getTeacherProfile,
} = require("../controllers/teacherController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


// ==========================================
// Teacher Profile
// ==========================================

router.get(
    "/profile",
    protect,
    authorize("teacher"),
    getTeacherProfile
);


// ==========================================
// Teacher Management
// ==========================================

// Add Teacher
router.post("/", addTeacher);

// Get All Teachers
router.get("/", getTeachers);

// Get Teacher By ID
router.get("/:id", getTeacherById);

// Update Teacher
router.put("/:id", updateTeacher);

// Delete Teacher
router.delete("/:id", deleteTeacher);


module.exports = router;