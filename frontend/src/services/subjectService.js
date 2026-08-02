import api from "./api";

export const getSubjects = () => api.get("/subjects");

export const addSubject = (data) => api.post("/subjects", data);

export const updateSubject = (id, data) =>
  api.put(`/subjects/${id}`, data);

export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`);