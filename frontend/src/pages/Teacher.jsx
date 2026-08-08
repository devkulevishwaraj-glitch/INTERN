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
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/teacherService";

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    email: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ==========================================
  // Fetch Teachers
  // ==========================================

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();

      console.log("Teachers:", res.data);

      setTeachers(res.data.data || []);
    } catch (error) {
      console.log("Fetch Teachers Error:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
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
  // Open Add Teacher
  // ==========================================

  const handleAddTeacher = () => {
    setFormData({
      name: "",
      employeeId: "",
      department: "",
      email: "",
      password: "",
    });

    setEditingId(null);
    setShowForm(true);
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {

        const updateData = {
          name: formData.name,
          employeeId: formData.employeeId,
          department: formData.department,
          email: formData.email,
        };

        const res = await updateTeacher(
          editingId,
          updateData
        );

        console.log(
          "Update Response:",
          res.data
        );

        alert("Teacher Updated Successfully");

      } else {

        const res = await addTeacher(formData);

        console.log(
          "Add Response:",
          res.data
        );

        alert("Teacher Added Successfully");
      }

      resetForm();
      fetchTeachers();

    } catch (error) {
      console.log(
        "Teacher Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name || "",
      employeeId: teacher.employeeId || "",
      department: teacher.department || "",
      email: teacher.email || "",
      password: "",
    });

    setEditingId(teacher._id);
    setShowForm(true);
  };

  // ==========================================
  // Delete
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTeacher(id);

      alert("Teacher Deleted Successfully");

      fetchTeachers();

    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete teacher"
      );
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setFormData({
      name: "",
      employeeId: "",
      department: "",
      email: "",
      password: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredTeachers = teachers.filter(
    (teacher) => {
      const searchText =
        search.toLowerCase();

      return (
        teacher.name
          ?.toLowerCase()
          .includes(searchText) ||

        teacher.employeeId
          ?.toLowerCase()
          .includes(searchText) ||

        teacher.department
          ?.toLowerCase()
          .includes(searchText) ||

        teacher.email
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <DashboardLayout>

      <div className="teachers-page">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="teachers-page-header">

          <div className="teachers-title-row">

            <div className="teachers-title-icon">
              <Users size={24} />
            </div>

            <div>

              <h1>
                Manage Teachers
              </h1>

              <p>
                Manage and organize all
                registered teachers.
              </p>

            </div>

          </div>

          <button
            className="add-teacher-button"
            onClick={handleAddTeacher}
          >
            <Plus size={18} />
            Add Teacher
          </button>

        </div>


        {/* =====================================
            SUMMARY
        ====================================== */}

        <div className="teachers-summary">

          <div className="teacher-summary-card">

            <div className="teacher-summary-icon">
              <Users size={21} />
            </div>

            <div>

              <span>
                Total Teachers
              </span>

              <strong>
                {teachers.length}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================
            SEARCH
        ====================================== */}

        <div className="teachers-toolbar">

          <div className="teacher-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by name, employee ID, department or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <span className="teacher-result-count">

            {filteredTeachers.length} teacher
            {filteredTeachers.length !== 1
              ? "s"
              : ""}

          </span>

        </div>


        {/* =====================================
            TABLE
        ====================================== */}

        <div className="teachers-table-card">

          <div className="teachers-table-wrapper">

            <table className="teachers-table">

              <thead>

                <tr>

                  <th>
                    Teacher
                  </th>

                  <th>
                    Employee ID
                  </th>

                  <th>
                    Department
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

                {filteredTeachers.length > 0 ? (

                  filteredTeachers.map(
                    (teacher) => (

                      <tr
                        key={teacher._id}
                      >

                        <td>

                          <div className="teacher-name-cell">

                            <div className="teacher-avatar">
                              {teacher.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>

                            <strong>
                              {teacher.name}
                            </strong>

                          </div>

                        </td>


                        <td>

                          <span className="employee-badge">
                            {teacher.employeeId}
                          </span>

                        </td>


                        <td>
                          {teacher.department}
                        </td>


                        <td>
                          {teacher.email}
                        </td>


                        <td>

                          <div className="teacher-actions">

                            <button
                              className="teacher-edit-button"
                              onClick={() =>
                                handleEdit(
                                  teacher
                                )
                              }
                              title="Edit Teacher"
                            >
                              <Pencil size={16} />
                            </button>


                            <button
                              className="teacher-delete-button"
                              onClick={() =>
                                handleDelete(
                                  teacher._id
                                )
                              }
                              title="Delete Teacher"
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
                      colSpan="5"
                      className="teachers-empty"
                    >

                      <Users size={35} />

                      <strong>
                        No teachers found
                      </strong>

                      <span>
                        Try changing your
                        search or add a new
                        teacher.
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

          <div className="teacher-modal-overlay">

            <div className="teacher-modal">


              <div className="teacher-modal-header">

                <div>

                  <h2>
                    {editingId
                      ? "Edit Teacher"
                      : "Add Teacher"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update teacher information."
                      : "Enter the teacher's information below."}
                  </p>

                </div>


                <button
                  type="button"
                  className="teacher-modal-close"
                  onClick={resetForm}
                >
                  <X size={20} />
                </button>

              </div>


              <form
                className="teacher-form"
                onSubmit={handleSubmit}
              >

                <div className="teacher-form-grid">


                  {/* NAME */}

                  <div className="teacher-form-group">

                    <label>
                      Teacher Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter teacher name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* EMPLOYEE ID */}

                  <div className="teacher-form-group">

                    <label>
                      Employee ID
                    </label>

                    <input
                      type="text"
                      name="employeeId"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* DEPARTMENT */}

                  <div className="teacher-form-group">

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


                  {/* EMAIL */}

                  <div className="teacher-form-group">

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

                  {!editingId && (

                    <div className="teacher-form-group teacher-password-group">

                      <label>
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        placeholder="Enter teacher password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                      />

                      <small>
                        This password will be used
                        by the teacher to log in.
                      </small>

                    </div>

                  )}

                </div>


                {/* BUTTONS */}

                <div className="teacher-form-actions">

                  <button
                    type="button"
                    className="teacher-cancel-button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="teacher-save-button"
                  >
                    {editingId
                      ? "Update Teacher"
                      : "Add Teacher"}
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

export default Teacher;