import api from "./api";

// Get all attendance (Admin/Teacher)
export const getAttendance = () => api.get("/attendance");

// Get logged-in student's attendance
export const getMyAttendance = () => api.get("/attendance/my");

// Add attendance
export const addAttendance = (data) =>
  api.post("/attendance", data);

// Update attendance
export const updateAttendance = (id, data) =>
  api.put(`/attendance/${id}`, data);

// Delete attendance
export const deleteAttendance = (id) =>
  api.delete(`/attendance/${id}`);