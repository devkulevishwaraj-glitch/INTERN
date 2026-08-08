import api from "./api";

// ==========================================
// Get All Teachers
// ==========================================

export const getTeachers = () => {
  return api.get("/teachers");
};


// ==========================================
// Add Teacher
// ==========================================

export const addTeacher = (data) => {
  return api.post("/teachers", data);
};


// ==========================================
// Update Teacher
// ==========================================

export const updateTeacher = (id, data) => {
  return api.put(`/teachers/${id}`, data);
};


// ==========================================
// Delete Teacher
// ==========================================

export const deleteTeacher = (id) => {
  return api.delete(`/teachers/${id}`);
};


// ==========================================
// Get Logged-in Teacher Profile
// ==========================================

export const getTeacherProfile = () => {
  return api.get("/teachers/profile");
};