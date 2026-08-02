import { useEffect, useState } from "react";
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectService";
import { getTeachers } from "../services/teacherService";

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    teacher: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSubject(editingId, form);
      } else {
        await addSubject(form);
      }

      setForm({
        subjectName: "",
        subjectCode: "",
        teacher: "",
      });

      setEditingId(null);
      fetchSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (subject) => {
    setForm({
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      teacher: subject.teacher || "",
    });

    setEditingId(subject._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this subject?")) {
      await deleteSubject(id);
      fetchSubjects();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Subject Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="subjectName"
          placeholder="Subject Name"
          value={form.subjectName}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="subjectCode"
          placeholder="Subject Code"
          value={form.subjectCode}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <select
          name="teacher"
          value={form.teacher}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="">Select Teacher</option>

          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Teacher </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.subjectName}</td>
              <td>{subject.subjectCode}</td>
              <td>{subject.teacher?subject.teacher.name : "Not Assigned"}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(subject._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Subject;