import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  UserRound,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

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
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    teacher: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ==========================================
  // Fetch Subjects
  // ==========================================

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();

      console.log("Subjects:", res.data);

      setSubjects(res.data.data || []);
    } catch (error) {
      console.log("Fetch Subjects Error:", error);
    }
  };

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
    fetchSubjects();
    fetchTeachers();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Open Add Subject
  // ==========================================

  const handleAddSubject = () => {
    setForm({
      subjectName: "",
      subjectCode: "",
      teacher: "",
    });

    setEditingId(null);
    setShowForm(true);
  };

  // ==========================================
  // Submit Form
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await updateSubject(
          editingId,
          form
        );

        console.log(
          "Update Response:",
          res.data
        );

        alert("Subject Updated Successfully");
      } else {
        const res = await addSubject(form);

        console.log(
          "Add Response:",
          res.data
        );

        alert("Subject Added Successfully");
      }

      resetForm();
      fetchSubjects();

    } catch (error) {
      console.log(
        "Subject Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };

  // ==========================================
  // Edit Subject
  // ==========================================

  const handleEdit = (subject) => {
    setForm({
      subjectName: subject.subjectName || "",
      subjectCode: subject.subjectCode || "",
      teacher:
        subject.teacher?._id ||
        subject.teacher ||
        "",
    });

    setEditingId(subject._id);
    setShowForm(true);
  };

  // ==========================================
  // Delete Subject
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSubject(id);

      alert("Subject Deleted Successfully");

      fetchSubjects();

    } catch (error) {
      console.log(
        "Delete Subject Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete subject"
      );
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setForm({
      subjectName: "",
      subjectCode: "",
      teacher: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredSubjects = subjects.filter(
    (subject) => {
      const searchText =
        search.toLowerCase();

      const teacherName =
        subject.teacher?.name || "";

      return (
        subject.subjectName
          ?.toLowerCase()
          .includes(searchText) ||

        subject.subjectCode
          ?.toLowerCase()
          .includes(searchText) ||

        teacherName
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <DashboardLayout>

      <div className="subjects-page">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="subjects-page-header">

          <div className="subjects-title-row">

            <div className="subjects-title-icon">
              <BookOpen size={24} />
            </div>

            <div>

              <h1>
                Manage Subjects
              </h1>

              <p>
                Manage subjects and assign
                teachers to each subject.
              </p>

            </div>

          </div>

          <button
            className="add-subject-button"
            onClick={handleAddSubject}
          >
            <Plus size={18} />
            Add Subject
          </button>

        </div>


        {/* =====================================
            SUMMARY
        ====================================== */}

        <div className="subjects-summary">

          <div className="subject-summary-card">

            <div className="subject-summary-icon">
              <BookOpen size={21} />
            </div>

            <div>

              <span>
                Total Subjects
              </span>

              <strong>
                {subjects.length}
              </strong>

            </div>

          </div>


          <div className="subject-summary-card">

            <div className="subject-summary-icon teacher-summary">
              <UserRound size={21} />
            </div>

            <div>

              <span>
                Available Teachers
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

        <div className="subjects-toolbar">

          <div className="subject-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by subject name, code or teacher..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <span className="subject-result-count">

            {filteredSubjects.length} subject
            {filteredSubjects.length !== 1
              ? "s"
              : ""}

          </span>

        </div>


        {/* =====================================
            TABLE
        ====================================== */}

        <div className="subjects-table-card">

          <div className="subjects-table-wrapper">

            <table className="subjects-table">

              <thead>

                <tr>

                  <th>
                    Subject
                  </th>

                  <th>
                    Subject Code
                  </th>

                  <th>
                    Assigned Teacher
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredSubjects.length > 0 ? (

                  filteredSubjects.map(
                    (subject) => (

                      <tr
                        key={subject._id}
                      >

                        {/* SUBJECT */}

                        <td>

                          <div className="subject-name-cell">

                            <div className="subject-avatar">
                              <BookOpen size={17} />
                            </div>

                            <strong>
                              {subject.subjectName}
                            </strong>

                          </div>

                        </td>


                        {/* CODE */}

                        <td>

                          <span className="subject-code-badge">
                            {subject.subjectCode}
                          </span>

                        </td>


                        {/* TEACHER */}

                        <td>

                          {subject.teacher ? (

                            <div className="assigned-teacher">

                              <div className="assigned-teacher-avatar">
                                {subject.teacher.name
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>

                              <span>
                                {subject.teacher.name}
                              </span>

                            </div>

                          ) : (

                            <span className="not-assigned">
                              Not Assigned
                            </span>

                          )}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="subject-actions">

                            <button
                              className="subject-edit-button"
                              onClick={() =>
                                handleEdit(
                                  subject
                                )
                              }
                              title="Edit Subject"
                            >
                              <Pencil size={16} />
                            </button>


                            <button
                              className="subject-delete-button"
                              onClick={() =>
                                handleDelete(
                                  subject._id
                                )
                              }
                              title="Delete Subject"
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
                      colSpan="4"
                      className="subjects-empty"
                    >

                      <BookOpen size={35} />

                      <strong>
                        No subjects found
                      </strong>

                      <span>
                        Try changing your search
                        or add a new subject.
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

          <div className="subject-modal-overlay">

            <div className="subject-modal">


              {/* MODAL HEADER */}

              <div className="subject-modal-header">

                <div>

                  <h2>

                    {editingId
                      ? "Edit Subject"
                      : "Add Subject"}

                  </h2>

                  <p>

                    {editingId
                      ? "Update subject information."
                      : "Enter the subject information below."}

                  </p>

                </div>


                <button
                  type="button"
                  className="subject-modal-close"
                  onClick={resetForm}
                >
                  <X size={20} />
                </button>

              </div>


              {/* FORM */}

              <form
                className="subject-form"
                onSubmit={handleSubmit}
              >

                <div className="subject-form-grid">


                  {/* SUBJECT NAME */}

                  <div className="subject-form-group">

                    <label>
                      Subject Name
                    </label>

                    <input
                      type="text"
                      name="subjectName"
                      placeholder="Enter subject name"
                      value={form.subjectName}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* SUBJECT CODE */}

                  <div className="subject-form-group">

                    <label>
                      Subject Code
                    </label>

                    <input
                      type="text"
                      name="subjectCode"
                      placeholder="Enter subject code"
                      value={form.subjectCode}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* TEACHER */}

                  <div className="subject-form-group subject-teacher-group">

                    <label>
                      Assign Teacher
                    </label>

                    <select
                      name="teacher"
                      value={form.teacher}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Teacher
                      </option>

                      {teachers.map(
                        (teacher) => (

                          <option
                            key={teacher._id}
                            value={teacher._id}
                          >
                            {teacher.name}
                            {" - "}
                            {teacher.department}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>


                {/* BUTTONS */}

                <div className="subject-form-actions">

                  <button
                    type="button"
                    className="subject-cancel-button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="subject-save-button"
                  >
                    {editingId
                      ? "Update Subject"
                      : "Add Subject"}
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

export default Subject;