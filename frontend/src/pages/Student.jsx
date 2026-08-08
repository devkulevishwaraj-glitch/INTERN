import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

function Student() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ==========================================
  // Fetch Students
  // ==========================================

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      console.log("Students:", res.data);

      setStudents(res.data.data || []);
    } catch (err) {
      console.log("Fetch Students Error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Open Add Student Form
  // ==========================================

  const handleAddStudent = () => {
    setFormData({
      name: "",
      rollNo: "",
      department: "",
      semester: "",
      email: "",
      password: "",
    });

    setIsEditing(false);
    setEditId(null);
    setShowForm(true);
  };

  // ==========================================
  // Submit Form
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);

      // ======================================
      // UPDATE STUDENT
      // ======================================

      if (isEditing) {
        const updateData = {
          name: formData.name,
          rollNo: formData.rollNo,
          department: formData.department,
          semester: formData.semester,
          email: formData.email,
        };

        const res = await updateStudent(
          editId,
          updateData
        );

        console.log("Update Response:", res.data);

        alert("Student Updated Successfully");
      }

      // ======================================
      // ADD STUDENT
      // ======================================

      else {
        const res = await addStudent(formData);

        console.log("Add Response:", res.data);

        alert("Student Added Successfully");
      }

      // Reset form
      setFormData({
        name: "",
        rollNo: "",
        department: "",
        semester: "",
        email: "",
        password: "",
      });

      setIsEditing(false);
      setEditId(null);
      setShowForm(false);

      fetchStudents();

    } catch (err) {
      console.log("Axios Error:", err);
      console.log(
        "Response:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // ==========================================
  // Edit Student
  // ==========================================

  const handleEdit = (student) => {
    setFormData({
      name: student.name || "",
      rollNo: student.rollNo || "",
      department: student.department || "",
      semester: student.semester || "",
      email: student.email || "",
      password: "",
    });

    setIsEditing(true);
    setEditId(student._id);
    setShowForm(true);
  };

  // ==========================================
  // Delete Student
  // ==========================================

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
      console.log(
        "Delete Error:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "Failed to delete student"
      );
    }
  };

  // ==========================================
  // Close Form
  // ==========================================

  const closeForm = () => {
    setShowForm(false);

    setFormData({
      name: "",
      rollNo: "",
      department: "",
      semester: "",
      email: "",
      password: "",
    });

    setIsEditing(false);
    setEditId(null);
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredStudents = students.filter(
    (student) => {
      const searchText =
        search.toLowerCase();

      return (
        student.name
          ?.toLowerCase()
          .includes(searchText) ||

        student.rollNo
          ?.toString()
          .toLowerCase()
          .includes(searchText) ||

        student.department
          ?.toLowerCase()
          .includes(searchText) ||

        student.email
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <DashboardLayout>

      <div className="students-page">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="students-page-header">

          <div>

            <div className="students-title-row">

              <div className="students-title-icon">
                <Users size={24} />
              </div>

              <div>

                <h1>
                  Manage Students
                </h1>

                <p>
                  Manage and organize all
                  registered students.
                </p>

              </div>

            </div>

          </div>

          <button
            className="add-student-button"
            onClick={handleAddStudent}
          >
            <Plus size={18} />
            Add Student
          </button>

        </div>


        {/* =====================================
            SUMMARY
        ====================================== */}

        <div className="students-summary">

          <div className="student-summary-card">

            <div className="student-summary-icon">
              <Users size={21} />
            </div>

            <div>

              <span>
                Total Students
              </span>

              <strong>
                {students.length}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            SEARCH
        ====================================== */}

        <div className="students-toolbar">

          <div className="student-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by name, roll number, department or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <span className="student-result-count">

            {filteredStudents.length} student
            {filteredStudents.length !== 1
              ? "s"
              : ""}

          </span>

        </div>


        {/* =====================================
            TABLE
        ====================================== */}

        <div className="students-table-card">

          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>

                <tr>

                  <th>
                    Student
                  </th>

                  <th>
                    Roll No
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Semester
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredStudents.length > 0 ? (

                  filteredStudents.map(
                    (student) => (

                      <tr
                        key={student._id}
                      >

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {student.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>
                              {student.name}
                            </strong>

                          </div>

                        </td>


                        <td>

                          <span className="roll-badge">
                            {student.rollNo}
                          </span>

                        </td>


                        <td>
                          {student.department}
                        </td>


                        <td>

                          <span className="semester-badge">

                            Semester{" "}
                            {student.semester}

                          </span>

                        </td>


                        <td>
                          {student.email}
                        </td>


                        <td>

                          <div className="student-actions">

                            <button
                              className="student-edit-button"
                              onClick={() =>
                                handleEdit(
                                  student
                                )
                              }
                              title="Edit Student"
                            >
                              <Pencil size={16} />
                            </button>


                            <button
                              className="student-delete-button"
                              onClick={() =>
                                handleDelete(
                                  student._id
                                )
                              }
                              title="Delete Student"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="students-empty"
                    >

                      <Users size={35} />

                      <strong>
                        No students found
                      </strong>

                      <span>
                        Try changing your
                        search or add a new
                        student.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================
            ADD / EDIT MODAL
        ====================================== */}

        {showForm && (

          <div className="student-modal-overlay">

            <div className="student-modal">


              {/* MODAL HEADER */}

              <div className="student-modal-header">

                <div>

                  <h2>

                    {isEditing
                      ? "Edit Student"
                      : "Add Student"}

                  </h2>

                  <p>

                    {isEditing
                      ? "Update student information."
                      : "Enter the student's information below."}

                  </p>

                </div>


                <button
                  type="button"
                  className="student-modal-close"
                  onClick={closeForm}
                >
                  <X size={20} />
                </button>

              </div>


              {/* FORM */}

              <form
                className="student-form"
                onSubmit={handleSubmit}
              >

                <div className="student-form-grid">


                  {/* NAME */}

                  <div className="student-form-group">

                    <label>
                      Student Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter student name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* ROLL NUMBER */}

                  <div className="student-form-group">

                    <label>
                      Roll Number
                    </label>

                    <input
                      type="text"
                      name="rollNo"
                      placeholder="Enter roll number"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* DEPARTMENT */}

                  <div className="student-form-group">

                    <label>
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      placeholder="Enter department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* SEMESTER */}

                  <div className="student-form-group">

                    <label>
                      Semester
                    </label>

                    <input
                      type="number"
                      name="semester"
                      placeholder="Enter semester"
                      value={formData.semester}
                      onChange={handleChange}
                      min="1"
                      max="8"
                      required
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="student-form-group student-email-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* PASSWORD */}

                  {!isEditing && (

                    <div className="student-form-group student-password-group">

                      <label>
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        placeholder="Enter student password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />

                      <small className="student-password-hint">
                        This password will be used by
                        the student to log in.
                      </small>

                    </div>

                  )}

                </div>


                {/* FORM BUTTONS */}

                <div className="student-form-actions">

                  <button
                    type="button"
                    className="student-cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="student-save-button"
                  >

                    {isEditing
                      ? "Update Student"
                      : "Add Student"}

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

export default Student;