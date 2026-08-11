import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";
import {
  Users,
  UserRound,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  UserPlus,
  UserCog,
  BookPlus,
  ShieldPlus,
  X,
} from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalSubjects: 0,
    totalAttendance: 0,
    attendancePercentage: 0,
  });

  // Create Admin
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await getDashboardStats();
      console.log(res.data);
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================================
  // Handle Admin Form
  // ==========================================

  const handleAdminChange = (e) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Create Admin
  // ==========================================

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    setAdminLoading(true);
    setAdminMessage("");
    setAdminError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/create-admin`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(adminForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create admin"
        );
      }

      setAdminMessage("Admin created successfully!");

      setAdminForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log("Create Admin Error:", error);

      setAdminError(
        error.message || "Failed to create admin"
      );
    } finally {
      setAdminLoading(false);
    }
  };

  // ==========================================
  // Close Modal
  // ==========================================

  const closeAdminModal = () => {
    setShowCreateAdmin(false);

    setAdminMessage("");
    setAdminError("");

    setAdminForm({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <DashboardLayout>

      {/* ==========================================
          PAGE STYLE
          ========================================== */}

      <style>{`

        /* Create Admin Button */

        .create-admin-action {
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }

        .create-admin-action:hover {
          transform: translateY(-1px);
        }


        /* ==========================================
           MODAL OVERLAY
           ========================================== */

        .create-admin-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;
          z-index: 9999;

          animation: adminFadeIn 0.2s ease;
        }


        /* ==========================================
           MODAL
           ========================================== */

        .create-admin-modal {
          width: 100%;
          max-width: 460px;

          background: #ffffff;
          border-radius: 18px;

          padding: 28px;

          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.25);

          animation: adminModalIn 0.25s ease;
        }


        /* ==========================================
           MODAL HEADER
           ========================================== */

        .create-admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          margin-bottom: 24px;
        }

        .create-admin-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .create-admin-title-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #eef6ff;
          color: #1687d9;
        }

        .create-admin-header h2 {
          margin: 0;

          font-size: 21px;
          font-weight: 700;

          color: #1f2937;
        }

        .create-admin-header p {
          margin: 4px 0 0;

          font-size: 13px;
          color: #6b7280;
        }


        /* ==========================================
           CLOSE BUTTON
           ========================================== */

        .create-admin-close {
          width: 34px;
          height: 34px;

          border: none;
          border-radius: 9px;

          background: #f3f4f6;
          color: #6b7280;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .create-admin-close:hover {
          background: #e5e7eb;
          color: #111827;
        }


        /* ==========================================
           FORM
           ========================================== */

        .create-admin-form {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .create-admin-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .create-admin-field label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .create-admin-input {
          width: 100%;
          box-sizing: border-box;

          padding: 12px 14px;

          border: 1px solid #d9dee7;
          border-radius: 10px;

          background: #ffffff;

          font-size: 14px;
          color: #1f2937;

          outline: none;

          transition: 0.2s ease;
        }

        .create-admin-input::placeholder {
          color: #9ca3af;
        }

        .create-admin-input:focus {
          border-color: #1687d9;

          box-shadow:
            0 0 0 3px rgba(22, 135, 217, 0.1);
        }


        /* ==========================================
           MESSAGES
           ========================================== */

        .create-admin-success {
          padding: 11px 13px;

          border-radius: 9px;

          background: #ecfdf3;
          border: 1px solid #b7ebc9;

          color: #16733d;

          font-size: 13px;
          font-weight: 500;

          margin-bottom: 17px;
        }

        .create-admin-error {
          padding: 11px 13px;

          border-radius: 9px;

          background: #fff1f2;
          border: 1px solid #fecdd3;

          color: #be123c;

          font-size: 13px;
          font-weight: 500;

          margin-bottom: 17px;
        }


        /* ==========================================
           SUBMIT BUTTON
           ========================================== */

        .create-admin-submit {
          width: 100%;

          border: none;
          border-radius: 10px;

          padding: 13px;

          background: #1687d9;
          color: #ffffff;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .create-admin-submit:hover {
          background: #0f76c1;
        }

        .create-admin-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }


        /* ==========================================
           ANIMATIONS
           ========================================== */

        @keyframes adminFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes adminModalIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        /* ==========================================
           MOBILE
           ========================================== */

        @media (max-width: 500px) {

          .create-admin-modal {
            padding: 22px;
            border-radius: 15px;
          }

          .create-admin-header h2 {
            font-size: 19px;
          }

        }

      `}</style>


      <div className="admin-dashboard">

        {/* PAGE HEADER */}

        <div className="admin-page-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Welcome back! Here's an overview of your attendance system.
            </p>
          </div>

        </div>


        {/* ==========================================
            STAT CARDS
            ========================================== */}

        <div className="admin-stats-grid">

          {/* Students */}

          <div className="admin-stat-card">

            <div className="admin-stat-top">

              <div className="admin-stat-icon students">
                <Users size={23} />
              </div>

              <span>Students</span>

            </div>

            <h2>{stats.totalStudents}</h2>

            <p>
              <TrendingUp size={14} />
              Total registered students
            </p>

          </div>


          {/* Teachers */}

          <div className="admin-stat-card">

            <div className="admin-stat-top">

              <div className="admin-stat-icon teachers">
                <UserRound size={23} />
              </div>

              <span>Teachers</span>

            </div>

            <h2>{stats.totalTeachers}</h2>

            <p>
              <TrendingUp size={14} />
              Total registered teachers
            </p>

          </div>


          {/* Subjects */}

          <div className="admin-stat-card">

            <div className="admin-stat-top">

              <div className="admin-stat-icon subjects">
                <BookOpen size={23} />
              </div>

              <span>Subjects</span>

            </div>

            <h2>{stats.totalSubjects}</h2>

            <p>
              <BookOpen size={14} />
              Total available subjects
            </p>

          </div>


          {/* Attendance */}

          <div className="admin-stat-card">

            <div className="admin-stat-top">

              <div className="admin-stat-icon attendance">
                <ClipboardCheck size={23} />
              </div>

              <span>Attendance</span>

            </div>

            <h2>{stats.totalAttendance}</h2>

            <p>
              <ClipboardCheck size={14} />
              Total attendance records
            </p>

          </div>

        </div>


        {/* ==========================================
            LOWER SECTION
            ========================================== */}

        <div className="admin-dashboard-grid">


          {/* Attendance Overview */}

          <div className="admin-panel attendance-panel">

            <div className="admin-panel-header">

              <div>

                <h2>Attendance Overview</h2>

                <p>
                  Overall attendance percentage
                </p>

              </div>

              <div className="panel-icon">
                <TrendingUp size={21} />
              </div>

            </div>


            <div className="attendance-overview-content">

              <div className="attendance-progress">

                <div
                  className="attendance-progress-bar"
                  style={{
                    width: `${Math.min(
                      Number(stats.attendancePercentage) || 0,
                      100
                    )}%`,
                  }}
                ></div>

              </div>


              <div className="attendance-percentage">

                <strong>
                  {stats.attendancePercentage}%
                </strong>

                <span>
                  Overall Attendance
                </span>

              </div>

            </div>

          </div>


          {/* ==========================================
              QUICK ACTIONS
              ========================================== */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>

                <h2>Quick Actions</h2>

                <p>
                  Common management tasks
                </p>

              </div>

            </div>


            <div className="admin-quick-actions">


              {/* Manage Students */}

              <a
                href="/students"
                className="admin-action"
              >

                <div className="action-icon">
                  <UserPlus size={19} />
                </div>

                <div>

                  <strong>
                    Manage Students
                  </strong>

                  <span>
                    View and manage students
                  </span>

                </div>

              </a>


              {/* Manage Teachers */}

              <a
                href="/teachers"
                className="admin-action"
              >

                <div className="action-icon">
                  <UserCog size={19} />
                </div>

                <div>

                  <strong>
                    Manage Teachers
                  </strong>

                  <span>
                    View and manage teachers
                  </span>

                </div>

              </a>


              {/* Manage Subjects */}

              <a
                href="/subjects"
                className="admin-action"
              >

                <div className="action-icon">
                  <BookPlus size={19} />
                </div>

                <div>

                  <strong>
                    Manage Subjects
                  </strong>

                  <span>
                    View and manage subjects
                  </span>

                </div>

              </a>


              {/* Create Admin */}

              <button
                type="button"
                className="admin-action create-admin-action"
                onClick={() => {

                  setShowCreateAdmin(true);

                  setAdminMessage("");
                  setAdminError("");

                }}
              >

                <div className="action-icon">
                  <ShieldPlus size={19} />
                </div>

                <div>

                  <strong>
                    Create Admin
                  </strong>

                  <span>
                    Add a new administrator
                  </span>

                </div>

              </button>

            </div>

          </div>

        </div>


        {/* ==========================================
            CREATE ADMIN MODAL
            ========================================== */}

        {showCreateAdmin && (

          <div
            className="create-admin-overlay"
            onClick={(e) => {

              if (e.target === e.currentTarget) {
                closeAdminModal();
              }

            }}
          >

            <div className="create-admin-modal">


              {/* Header */}

              <div className="create-admin-header">

                <div className="create-admin-title">

                  <div className="create-admin-title-icon">
                    <ShieldPlus size={22} />
                  </div>

                  <div>

                    <h2>
                      Create New Admin
                    </h2>

                    <p>
                      Create an administrator account
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  className="create-admin-close"
                  onClick={closeAdminModal}
                >

                  <X size={19} />

                </button>

              </div>


              {/* Success */}

              {adminMessage && (

                <div className="create-admin-success">
                  {adminMessage}
                </div>

              )}


              {/* Error */}

              {adminError && (

                <div className="create-admin-error">
                  {adminError}
                </div>

              )}


              {/* Form */}

              <form
                className="create-admin-form"
                onSubmit={handleCreateAdmin}
              >


                {/* Full Name */}

                <div className="create-admin-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    className="create-admin-input"
                    type="text"
                    name="name"
                    placeholder="Enter admin name"
                    value={adminForm.name}
                    onChange={handleAdminChange}
                    required
                  />

                </div>


                {/* Email */}

                <div className="create-admin-field">

                  <label>
                    Email Address
                  </label>

                  <input
                    className="create-admin-input"
                    type="email"
                    name="email"
                    placeholder="Enter admin email"
                    value={adminForm.email}
                    onChange={handleAdminChange}
                    required
                  />

                </div>


                {/* Password */}

                <div className="create-admin-field">

                  <label>
                    Password
                  </label>

                  <input
                    className="create-admin-input"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={adminForm.password}
                    onChange={handleAdminChange}
                    required
                  />

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  className="create-admin-submit"
                  disabled={adminLoading}
                >

                  {adminLoading
                    ? "Creating Admin..."
                    : "Create Admin"}

                </button>

              </form>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;