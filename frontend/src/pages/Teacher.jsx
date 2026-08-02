import { useState, useEffect } from "react";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teacherService";

function Teacher() {
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTeacher(editingId, formData);
      } else {
        await addTeacher(formData);
      }

      fetchTeachers();

      setFormData({
        name: "",
        employeeId: "",
        department: "",
        email: "",
      });

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name,
      employeeId: teacher.employeeId,
      department: teacher.department,
      email: teacher.email,
    });

    setEditingId(teacher._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Teacher Management</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.employeeId}</td>
              <td>{teacher.department}</td>
              <td>{teacher.email}</td>

              <td>
                <button onClick={() => handleEdit(teacher)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(teacher._id)}>
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

export default Teacher;