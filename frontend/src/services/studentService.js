import api from "./api";

export const getStudents = () => {
  return api.get("/students");
};

export const addStudent = (studentData) => {
  return api.post("/students", studentData);
};

export const updateStudent = (id, studentData) => {
  return api.put(`/students/${id}`, studentData);
};

export const deleteStudent = (id) => {
  return api.delete(`/students/${id}`);
};