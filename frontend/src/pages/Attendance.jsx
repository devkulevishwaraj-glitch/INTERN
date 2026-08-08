import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  UserRound,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

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

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    student: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance();
      setAttendance(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAttendance = () => {
    setForm({
      student: "",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
    });

    setEditingId(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAttendance(editingId, form);
        alert("Attendance Updated Successfully");
      } else {
        await addAttendance(form);
        alert("Attendance Marked Successfully");
      }

      resetForm();
      fetchAttendance();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  const handleEdit = (record) => {
    setForm({
      student: record.student?._id || "",
      subject: record.subject?._id || "",
      date: record.date
        ? new Date(record.date).toISOString().split("T")[0]
        : "",
      status: record.status || "Present",
    });

    setEditingId(record._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);

      alert("Attendance Deleted Successfully");

      fetchAttendance();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete attendance"
      );
    }
  };

  const resetForm = () => {
    setForm({
      student: "",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const filteredAttendance = attendance.filter((record) => {
    const searchText = search.toLowerCase();

    const studentName = record.student?.name || "";
    const subjectName = record.subject?.subjectName || "";
    const subjectCode = record.subject?.subjectCode || "";
    const status = record.status || "";

    return (
      studentName.toLowerCase().includes(searchText) ||
      subjectName.toLowerCase().includes(searchText) ||
      subjectCode.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText)
    );
  });

  const totalRecords = attendance.length;

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const attendancePercentage =
    totalRecords === 0
      ? 0
      : ((presentCount / totalRecords) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="attendance-page">

        <div className="attendance-page-header">

          <div className="attendance-title-row">

            <div className="attendance-title-icon">
              <ClipboardCheck size={24} />
            </div>

            <div>
              <h1>Attendance Management</h1>

              <p>
                Mark and manage student attendance records.
              </p>
            </div>

          </div>

          <button
            className="add-attendance-button"
            onClick={handleAddAttendance}
          >
            <Plus size={18} />
            Mark Attendance
          </button>

        </div>

        <div className="attendance-summary">

          <div className="attendance-summary-card">
            <div className="attendance-summary-icon blue">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <span>Total Records</span>
              <strong>{totalRecords}</strong>
            </div>
          </div>

          <div className="attendance-summary-card">
            <div className="attendance-summary-icon green">
              <CheckCircle size={21} />
            </div>

            <div>
              <span>Present</span>
              <strong>{presentCount}</strong>
            </div>
          </div>

          <div className="attendance-summary-card">
            <div className="attendance-summary-icon red">
              <XCircle size={21} />
            </div>

            <div>
              <span>Absent</span>
              <strong>{absentCount}</strong>
            </div>
          </div>

          <div className="attendance-summary-card">
            <div className="attendance-summary-icon orange">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <span>Attendance Rate</span>
              <strong>{attendancePercentage}%</strong>
            </div>
          </div>

        </div>

        <div className="attendance-toolbar">

          <div className="attendance-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by student, subject or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="attendance-result-count">
            {filteredAttendance.length} record
            {filteredAttendance.length !== 1 ? "s" : ""}
          </span>

        </div>

        <div className="attendance-table-card">

          <div className="attendance-table-wrapper">

            <table className="attendance-table">

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

                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record) => (
                    <tr key={record._id}>

                      <td>
                        <div className="attendance-student-cell">

                          <div className="attendance-student-avatar">
                            {record.student?.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {record.student?.name ||
                              "Unknown Student"}
                          </strong>

                        </div>
                      </td>

                      <td>
                        <div className="attendance-subject-cell">

                          <BookOpen size={15} />

                          <div>
                            <strong>
                              {record.subject?.subjectName ||
                                "Unknown Subject"}
                            </strong>

                            <span>
                              {record.subject?.subjectCode || ""}
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <div className="attendance-date-cell">

                          <CalendarDays size={15} />

                          <span>
                            {record.date
                              ? new Date(
                                  record.date
                                ).toLocaleDateString("en-IN")
                              : "-"}
                          </span>

                        </div>
                      </td>

                      <td>
                        {record.status === "Present" ? (
                          <span className="attendance-status present">
                            <CheckCircle size={14} />
                            Present
                          </span>
                        ) : (
                          <span className="attendance-status absent">
                            <XCircle size={14} />
                            Absent
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="attendance-actions">

                          <button
                            className="attendance-edit-button"
                            onClick={() => handleEdit(record)}
                            title="Edit Attendance"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="attendance-delete-button"
                            onClick={() =>
                              handleDelete(record._id)
                            }
                            title="Delete Attendance"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="attendance-empty"
                    >
                      <ClipboardCheck size={38} />

                      <strong>
                        No attendance records found
                      </strong>

                      <span>
                        Mark attendance to create your first record.
                      </span>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

        {showForm && (
          <div className="attendance-modal-overlay">

            <div className="attendance-modal">

              <div className="attendance-modal-header">

                <div>
                  <h2>
                    {editingId
                      ? "Edit Attendance"
                      : "Mark Attendance"}
                  </h2>

                  <p>
                    Select a student, subject and attendance status.
                  </p>
                </div>

                <button
                  type="button"
                  className="attendance-modal-close"
                  onClick={resetForm}
                >
                  <X size={20} />
                </button>

              </div>

              <form
                className="attendance-form"
                onSubmit={handleSubmit}
              >

                <div className="attendance-form-grid">

                  <div className="attendance-form-group">

                    <label>Student</label>

                    <div className="attendance-select-wrapper">

                      <UserRound size={16} />

                      <select
                        name="student"
                        value={form.student}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Student
                        </option>

                        {students.map((student) => (
                          <option
                            key={student._id}
                            value={student._id}
                          >
                            {student.name} - {student.rollNo}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                  <div className="attendance-form-group">

                    <label>Subject</label>

                    <div className="attendance-select-wrapper">

                      <BookOpen size={16} />

                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Subject
                        </option>

                        {subjects.map((subject) => (
                          <option
                            key={subject._id}
                            value={subject._id}
                          >
                            {subject.subjectName} -{" "}
                            {subject.subjectCode}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                  <div className="attendance-form-group">

                    <label>Date</label>

                    <div className="attendance-input-wrapper">

                      <CalendarDays size={16} />

                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="attendance-form-group">

                    <label>Attendance Status</label>

                    <div className="attendance-status-options">

                      <label
                        className={`attendance-status-option ${
                          form.status === "Present"
                            ? "selected-present"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="Present"
                          checked={
                            form.status === "Present"
                          }
                          onChange={handleChange}
                        />

                        <CheckCircle size={16} />

                        Present
                      </label>

                      <label
                        className={`attendance-status-option ${
                          form.status === "Absent"
                            ? "selected-absent"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value="Absent"
                          checked={
                            form.status === "Absent"
                          }
                          onChange={handleChange}
                        />

                        <XCircle size={16} />

                        Absent
                      </label>

                    </div>

                  </div>

                </div>

                <div className="attendance-form-actions">

                  <button
                    type="button"
                    className="attendance-cancel-button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="attendance-save-button"
                  >
                    {editingId
                      ? "Update Attendance"
                      : "Mark Attendance"}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Attendance;