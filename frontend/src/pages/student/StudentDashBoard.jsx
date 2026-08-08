import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getStudentDashboard } from "../../services/studentService";

function StudentDashboard() {
  const [stats, setStats] = useState({
    attendancePercentage: 0,
    presentDays: 0,
    totalSubjects: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getStudentDashboard();

      console.log("Student Dashboard:", res.data);

      setStats({
        attendancePercentage: res.data.attendancePercentage || 0,
        presentDays: res.data.presentDays || 0,
        totalSubjects: res.data.totalSubjects || 0,
      });
    } catch (error) {
      console.error("Student Dashboard Error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="student-dashboard-page">

        {/* PAGE HEADER */}
        <div className="student-dashboard-header">
          <div className="student-dashboard-title">

            <div className="student-dashboard-title-icon">
              <TrendingUp size={24} />
            </div>

            <div>
              <h1>Student Dashboard</h1>
              <p>
                View your attendance and academic overview.
              </p>
            </div>

          </div>
        </div>

        {/* STATISTICS */}
        <div className="student-dashboard-stats">

          {/* Attendance */}
          <div className="student-dashboard-card">

            <div className="student-dashboard-card-icon blue">
              <TrendingUp size={22} />
            </div>

            <div>
              <span>Attendance Percentage</span>

              <strong>
                {stats.attendancePercentage}%
              </strong>
            </div>

          </div>

          {/* Subjects */}
          <div className="student-dashboard-card">

            <div className="student-dashboard-card-icon green">
              <BookOpen size={22} />
            </div>

            <div>
              <span>Total Subjects</span>

              <strong>
                {stats.totalSubjects}
              </strong>
            </div>

          </div>

          {/* Present Days */}
          <div className="student-dashboard-card">

            <div className="student-dashboard-card-icon purple">
              <ClipboardCheck size={22} />
            </div>

            <div>
              <span>Present Days</span>

              <strong>
                {stats.presentDays}
              </strong>
            </div>

          </div>

        </div>

        {/* ATTENDANCE OVERVIEW */}
        <div className="student-attendance-overview">

          <div className="student-overview-header">

            <div>
              <h2>Attendance Overview</h2>

              <p>
                Your overall attendance performance
              </p>
            </div>

            <strong className="student-percentage">
              {stats.attendancePercentage}%
            </strong>

          </div>

          {/* PROGRESS BAR */}
          <div className="student-progress-container">

            <div
              className="student-progress-bar"
              style={{
                width: `${Math.min(
                  Number(stats.attendancePercentage) || 0,
                  100
                )}%`,
              }}
            ></div>

          </div>

          <div className="student-attendance-footer">

            <span>Overall Attendance</span>

            <strong>
              {stats.attendancePercentage}%
            </strong>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;