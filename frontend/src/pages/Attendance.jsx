import { useEffect, useState } from "react";
import {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";
import { getStudents } from "../services/studentService";
import { getSubjects } from "../services/subjectService";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    student: "",
    subject: "",
    date: "",
    status: "Present",
  });

  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
  fetchAttendance();
  fetchStudents();
  fetchSubjects();
}, []);

const fetchAttendance = async () => {
  try {
    const res = await getAttendance();
    setAttendance(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchStudents = async () => {
  try {
    const res = await getStudents();
    setStudents(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchSubjects = async () => {
  try {
    const res = await getSubjects();
    setSubjects(res.data.data);
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
      await updateAttendance(editingId, form);
    } else {
      await addAttendance(form);
    }

    setForm({
      student: "",
      subject: "",
      date: "",
      status: "Present",
    });

    setEditingId(null);
    fetchAttendance();
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (record) => {
  setForm({
    student: record.student?._id || "",
    subject: record.subject?._id || "",
    date: record.date
      ? new Date(record.date).toISOString().split("T")[0]
      : "",
    status: record.status,
  });

  setEditingId(record._id);
};

const handleDelete = async (id) => {
  if (window.confirm("Delete this attendance record?")) {
    await deleteAttendance(id);
    fetchAttendance();
  }
};
return (
  <div className="container mt-4">
    <h2>Attendance Management</h2>

    <form onSubmit={handleSubmit} className="mb-4">

      <select
        name="student"
        value={form.student}
        onChange={handleChange}
        className="form-control mb-2"
        required
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        name="subject"
        value={form.subject}
        onChange={handleChange}
        className="form-control mb-2"
        required
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.subjectName}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="form-control mb-2"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button type="submit" className="btn btn-primary">
        {editingId ? "Update Attendance" : "Mark Attendance"}
      </button>
    </form>
    <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{record.student ? record.student.name : "N/A"}</td>
              <td>
                {record.subject ? record.subject.subjectName : "N/A"}
              </td>
              <td>
                {record.date
                  ? new Date(record.date).toLocaleDateString()
                  : ""}
              </td>
              <td>{record.status}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(record)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
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

export default Attendance;