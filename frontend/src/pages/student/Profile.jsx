import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getStudentProfile } from "../../services/studentService";

import {
  UserCircle,
  Mail,
  GraduationCap,
  Hash,
  Building2,
  BookOpen,
} from "lucide-react";

function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const res = await getStudentProfile();

      console.log("Student Profile:", res.data);

      setStudent(res.data.data);
    } catch (error) {
      console.error("Student Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="student-profile-page">
          <p>Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="student-profile-page">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="student-profile-header">

          <div className="student-profile-title-row">

            <div className="student-profile-title-icon">
              <UserCircle size={25} />
            </div>

            <div>
              <h1>Student Profile</h1>

              <p>
                View your personal and academic information.
              </p>
            </div>

          </div>

        </div>


        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="student-profile-card">

          {/* Profile Top */}

          <div className="student-profile-top">

            <div className="student-profile-avatar">
              {student?.name?.charAt(0).toUpperCase() || "S"}
            </div>

            <div>

              <h2>
                {student?.name || "Student"}
              </h2>

              <span className="student-profile-role">
                Student
              </span>

            </div>

          </div>


          {/* ==========================================
              INFORMATION
          ========================================== */}

          <div className="student-profile-info">

            {/* Full Name */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <UserCircle size={19} />
              </div>

              <div>
                <span>Full Name</span>

                <strong>
                  {student?.name || "Not Available"}
                </strong>
              </div>

            </div>


            {/* Email */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>Email</span>

                <strong>
                  {student?.email || "Not Available"}
                </strong>
              </div>

            </div>


            {/* Roll Number */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <Hash size={19} />
              </div>

              <div>
                <span>Roll Number</span>

                <strong>
                  {student?.rollNo || "Not Available"}
                </strong>
              </div>

            </div>


            {/* Department */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <Building2 size={19} />
              </div>

              <div>
                <span>Department</span>

                <strong>
                  {student?.department || "Not Available"}
                </strong>
              </div>

            </div>


            {/* Semester */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <BookOpen size={19} />
              </div>

              <div>
                <span>Semester</span>

                <strong>
                  {student?.semester
                    ? `Semester ${student.semester}`
                    : "Not Available"}
                </strong>
              </div>

            </div>


            {/* Role */}

            <div className="student-profile-item">

              <div className="student-profile-item-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Account Role</span>

                <strong>
                  Student
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