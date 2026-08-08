import api from "./api";

// ==========================================
// Get All Students
// ==========================================
export const getStudents = () => {
  return api.get("/students");
};


// ==========================================
// Add Student
// ==========================================
export const addStudent = (studentData) => {
  return api.post("/students", studentData);
};


// ==========================================
// Update Student
// ==========================================
export const updateStudent = (id, studentData) => {
  return api.put(`/students/${id}`, studentData);
};


// ==========================================
// Delete Student
// ==========================================
export const deleteStudent = (id) => {
  return api.delete(`/students/${id}`);
};


// ==========================================
// Student Dashboard
// ==========================================
export const getStudentDashboard = () => {
  return api.get("/students/dashboard");
};


// ==========================================
// Logged-in Student Profile
// ==========================================
export const getStudentProfile = () => {
  return api.get("/students/profile");
};