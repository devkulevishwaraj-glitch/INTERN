import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

function Student() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      console.log("Students:", res.data);
      setStudents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);

      if (isEditing) {
        const res = await updateStudent(editId, formData);
        console.log("Update Response:", res.data);
        alert("Student Updated Successfully");
      } else {
        const res = await addStudent(formData);
        console.log("Add Response:", res.data);
        alert("Student Added Successfully");
      }

      setFormData({
        name: "",
        rollNo: "",
        department: "",
        semester: "",
        email: "",
      });

      setIsEditing(false);
      setEditId(null);

      fetchStudents();
    } catch (err) {
      console.log("Axios Error:", err);
      console.log("Response:", err.response?.data);

      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      semester: student.semester,
      email: student.email,
    });

    setIsEditing(true);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Student Deleted Successfully");
      fetchStudents();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Students</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={formData.rollNo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td>{student.email}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>{" "}
                <button
                  type="button"
                  onClick={() => handleDelete(student._id)}
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

export default Student;