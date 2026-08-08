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
} from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalSubjects: 0,
    totalAttendance: 0,
    attendancePercentage: 0,
  });

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

  return (
    <DashboardLayout>
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

        {/* STAT CARDS */}
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

        {/* LOWER SECTION */}
        <div className="admin-dashboard-grid">

          {/* Attendance Overview */}
          <div className="admin-panel attendance-panel">

            <div className="admin-panel-header">
              <div>
                <h2>Attendance Overview</h2>
                <p>Overall attendance percentage</p>
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

                <span>Overall Attendance</span>
              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="admin-panel">

            <div className="admin-panel-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Common management tasks</p>
              </div>
            </div>

            <div className="admin-quick-actions">

              <a href="/students" className="admin-action">
                <div className="action-icon">
                  <UserPlus size={19} />
                </div>

                <div>
                  <strong>Manage Students</strong>
                  <span>View and manage students</span>
                </div>
              </a>

              <a href="/teachers" className="admin-action">
                <div className="action-icon">
                  <UserCog size={19} />
                </div>

                <div>
                  <strong>Manage Teachers</strong>
                  <span>View and manage teachers</span>
                </div>
              </a>

              <a href="/subjects" className="admin-action">
                <div className="action-icon">
                  <BookPlus size={19} />
                </div>

                <div>
                  <strong>Manage Subjects</strong>
                  <span>View and manage subjects</span>
                </div>
              </a>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;