const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  email: String,
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

module.exports = Student;