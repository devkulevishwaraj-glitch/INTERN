const express = require("express");
const router = express.Router();

const {
    addTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacherController");

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