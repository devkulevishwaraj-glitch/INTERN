const express = require('express');
const router = express.Router();

const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

// Add a new student
router.post("/",addStudent);

// Get all students
router.get("/", getAllStudents);

// Get a student by ID
router.get("/:id", getStudentById);

// Update a student by ID
router.put("/:id", updateStudent);

// Delete a student by ID
router.delete("/:id", deleteStudent);

module.exports = router;