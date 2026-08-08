import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

function TeacherDashboard() {
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalAttendance: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats({
        totalSubjects: res.data.totalSubjects || 0,
        totalAttendance: res.data.totalAttendance || 0,
        totalStudents: res.data.totalStudents || 0,
      });
    } catch (error) {
      console.error("Teacher Dashboard Error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="teacher-dashboard">

        {/* PAGE HEADER */}

        <div className="teacher-welcome">

          <div>
            <h1>Teacher Dashboard</h1>

            <p>
              Manage your subjects and student attendance from here.
            </p>
          </div>

          <div className="teacher-header-icon">
            <BookOpen size={25} />
          </div>

        </div>

        {/* STAT CARDS */}

        <div className="teacher-stats-grid">

          <div className="teacher-stat-card">

            <div className="teacher-stat-top">

              <div className="teacher-stat-icon blue">
                <BookOpen size={21} />
              </div>

              <span className="teacher-stat-label">
                My Subjects
              </span>

            </div>

            <strong className="teacher-stat-value">
              {stats.totalSubjects}
            </strong>

            <span className="teacher-stat-bottom">
              Assigned subjects
            </span>

          </div>

          <div className="teacher-stat-card">

            <div className="teacher-stat-top">

              <div className="teacher-stat-icon green">
                <ClipboardCheck size={21} />
              </div>

              <span className="teacher-stat-label">
                Today's Attendance
              </span>

            </div>

            <strong className="teacher-stat-value">
              {stats.totalAttendance}
            </strong>

            <span className="teacher-stat-bottom">
              Attendance records today
            </span>

          </div>

          <div className="teacher-stat-card">

            <div className="teacher-stat-top">

              <div className="teacher-stat-icon purple">
                <Users size={21} />
              </div>

              <span className="teacher-stat-label">
                Total Students
              </span>

            </div>

            <strong className="teacher-stat-value">
              {stats.totalStudents}
            </strong>

            <span className="teacher-stat-bottom">
              Students in system
            </span>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="teacher-dashboard-grid">

          <div className="teacher-dashboard-card">

            <div className="teacher-card-header">

              <div>
                <h2>Quick Actions</h2>

                <p>
                  Frequently used teacher functions
                </p>
              </div>

              <div className="teacher-card-icon">
                <CheckCircle size={20} />
              </div>

            </div>

            <div className="teacher-quick-actions">

              <Link
                to="/attendance"
                className="teacher-quick-action"
              >
                <div className="teacher-quick-action-icon">
                  <ClipboardCheck size={19} />
                </div>

                <div>
                  <strong>Mark Attendance</strong>
                  <span>
                    Record today's student attendance
                  </span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <Link
                to="/attendance"
                className="teacher-quick-action"
              >
                <div className="teacher-quick-action-icon">
                  <Users size={19} />
                </div>

                <div>
                  <strong>View Attendance</strong>
                  <span>
                    Check attendance records
                  </span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <Link
                to="/teacher/profile"
                className="teacher-quick-action"
              >
                <div className="teacher-quick-action-icon">
                  <BookOpen size={19} />
                </div>

                <div>
                  <strong>My Profile</strong>
                  <span>
                    View your teacher information
                  </span>
                </div>

                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

          {/* ATTENDANCE OVERVIEW */}

          <div className="teacher-dashboard-card">

            <div className="teacher-card-header">

              <div>
                <h2>Attendance Overview</h2>

                <p>
                  Today's attendance activity
                </p>
              </div>

              <div className="teacher-card-icon green">
                <ClipboardCheck size={20} />
              </div>

            </div>

            <div className="teacher-attendance-overview">

              <div className="teacher-attendance-number">
                {stats.totalAttendance}
              </div>

              <p>
                attendance records marked today
              </p>

              <Link
                to="/attendance"
                className="teacher-view-button"
              >
                View Attendance
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;