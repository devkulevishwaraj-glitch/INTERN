const express = require("express");
const router = express.Router();

const {
    addSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
} = require("../controllers/subjectController");

// Add Subject
router.post("/", addSubject);

// Get All Subjects
router.get("/", getSubjects);

// Get Subject By ID
router.get("/:id", getSubjectById);

// Update Subject
router.put("/:id", updateSubject);

// Delete Subject
router.delete("/:id", deleteSubject);

module.exports = router;