import { useEffect, useState } from "react";

import {
  UserRound,
  Mail,
  Building2,
  BadgeCheck,
  ShieldCheck,
  Hash,
  AlertCircle,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { getTeacherProfile } from "../../services/teacherService";

function Profile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Teacher Profile
  // ==========================================

  useEffect(() => {
    fetchTeacherProfile();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getTeacherProfile();

      console.log("Teacher Profile:", res.data);

      setTeacher(res.data.data);
    } catch (error) {
      console.error("Teacher Profile Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load teacher profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="profile-page">
          <div className="profile-page-header">
            <div className="profile-title-row">
              <div className="profile-title-icon">
                <UserRound size={24} />
              </div>

              <div>
                <h1>My Profile</h1>
                <p>
                  View your teacher account information.
                </p>
              </div>
            </div>
          </div>

          <div className="profile-information-card">
            <p
              style={{
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Loading profile...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <DashboardLayout>
        <div className="profile-page">
          <div className="profile-page-header">
            <div className="profile-title-row">
              <div className="profile-title-icon">
                <UserRound size={24} />
              </div>

              <div>
                <h1>My Profile</h1>
                <p>
                  View your teacher account information.
                </p>
              </div>
            </div>
          </div>

          <div
            className="profile-information-card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#dc2626",
            }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="profile-page-header">
          <div className="profile-title-row">

            <div className="profile-title-icon">
              <UserRound size={24} />
            </div>

            <div>
              <h1>My Profile</h1>

              <p>
                View your teacher account information.
              </p>
            </div>

          </div>
        </div>


        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="profile-main-card">

          <div className="profile-cover"></div>

          <div className="profile-content">

            {/* AVATAR */}

            <div className="profile-avatar">
              {teacher?.name
                ? teacher.name
                    .charAt(0)
                    .toUpperCase()
                : "T"}
            </div>


            {/* NAME */}

            <div className="profile-name-section">

              <h2>
                {teacher?.name || "Teacher"}
              </h2>

              <span>
                Teacher
              </span>

            </div>

          </div>

        </div>


        {/* ==========================================
            INFORMATION CARD
        ========================================== */}

        <div className="profile-information-card">

          <div className="profile-card-header">

            <div>
              <h2>
                Personal Information
              </h2>

              <p>
                Your registered teacher account details.
              </p>
            </div>

            <div className="profile-header-icon">
              <ShieldCheck size={20} />
            </div>

          </div>


          {/* ==========================================
              INFORMATION GRID
          ========================================== */}

          <div className="profile-info-grid">


            {/* FULL NAME */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <UserRound size={18} />
              </div>

              <div>
                <span>Full Name</span>

                <strong>
                  {teacher?.name ||
                    "Not Available"}
                </strong>
              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email Address</span>

                <strong>
                  {teacher?.email ||
                    "Not Available"}
                </strong>
              </div>

            </div>


            {/* EMPLOYEE ID */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <Hash size={18} />
              </div>

              <div>
                <span>Employee ID</span>

                <strong>
                  {teacher?.employeeId ||
                    "Not Available"}
                </strong>
              </div>

            </div>


            {/* DEPARTMENT */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <Building2 size={18} />
              </div>

              <div>
                <span>Department</span>

                <strong>
                  {teacher?.department ||
                    "Not Available"}
                </strong>
              </div>

            </div>


            {/* ROLE */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <BadgeCheck size={18} />
              </div>

              <div>
                <span>Role</span>

                <strong>
                  Teacher
                </strong>
              </div>

            </div>


            {/* ACCOUNT STATUS */}

            <div className="profile-info-item">

              <div className="profile-info-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>Account Status</span>

                <strong>
                  Active
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;