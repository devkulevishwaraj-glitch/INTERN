import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import {
  LayoutDashboard,
  Users,
  UserRound,
  BookOpen,
  ClipboardCheck,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import "../index.css";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <GraduationCap size={25} />
          </div>

          <h2>
            Attendance<span>Hub</span>
          </h2>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/students" className="nav-item">
            <Users size={20} />
            <span>Students</span>
          </Link>

          <Link to="/teachers" className="nav-item">
            <UserRound size={20} />
            <span>Teachers</span>
          </Link>

          <Link to="/subjects" className="nav-item">
            <BookOpen size={20} />
            <span>Subjects</span>
          </Link>

          <Link to="/attendance" className="nav-item">
            <ClipboardCheck size={20} />
            <span>Attendance</span>
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/profile" className="nav-item">
            <Settings size={20} />
            <span>Profile</span>
          </Link>

          <Link to="/login" className="nav-item logout-item">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main">

        {/* TOP NAVBAR */}
        <header className="dashboard-navbar">

          <div>
            <h3>Dashboard</h3>
            <p>Overview of your attendance system</p>
          </div>

          <div className="navbar-right">

            <button className="notification-button">
              <Bell size={20} />
              <span></span>
            </button>

            <div className="user-info">
              <div className="user-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <section className="dashboard-content">

          <div className="welcome-section">
            <div>
              <h1>Welcome back, Admin! 👋</h1>
              <p>
                Here's what's happening with your attendance system today.
              </p>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="stats-grid">

            {/* Students */}
            <div className="stat-card">

              <div className="stat-card-top">
                <div className="stat-icon students-icon">
                  <Users size={23} />
                </div>

                <span className="stat-label">Students</span>
              </div>

              <div className="stat-value">
                {loading ? "..." : stats.totalStudents ?? 0}
              </div>

              <div className="stat-bottom">
                <TrendingUp size={15} />
                <span>Total registered students</span>
              </div>

            </div>

            {/* Teachers */}
            <div className="stat-card">

              <div className="stat-card-top">
                <div className="stat-icon teachers-icon">
                  <UserRound size={23} />
                </div>

                <span className="stat-label">Teachers</span>
              </div>

              <div className="stat-value">
                {loading ? "..." : stats.totalTeachers ?? 0}
              </div>

              <div className="stat-bottom">
                <TrendingUp size={15} />
                <span>Total registered teachers</span>
              </div>

            </div>

            {/* Today's Attendance */}
            <div className="stat-card">

              <div className="stat-card-top">
                <div className="stat-icon attendance-icon">
                  <ClipboardCheck size={23} />
                </div>

                <span className="stat-label">Today's Attendance</span>
              </div>

              <div className="stat-value">
                {loading ? "..." : stats.todayAttendance ?? 0}
              </div>

              <div className="stat-bottom">
                <ClipboardCheck size={15} />
                <span>Attendance marked today</span>
              </div>

            </div>

            {/* Percentage */}
            <div className="stat-card">

              <div className="stat-card-top">
                <div className="stat-icon percentage-icon">
                  <TrendingUp size={23} />
                </div>

                <span className="stat-label">Attendance Rate</span>
              </div>

              <div className="stat-value">
                {loading
                  ? "..."
                  : `${stats.attendancePercentage ?? 0}%`}
              </div>

              <div className="stat-bottom">
                <TrendingUp size={15} />
                <span>Overall attendance</span>
              </div>

            </div>

          </div>

          {/* BOTTOM CARDS */}
          <div className="dashboard-grid">

            {/* Attendance Overview */}
            <div className="dashboard-card attendance-overview">

              <div className="card-header">
                <div>
                  <h2>Attendance Overview</h2>
                  <p>Today's attendance performance</p>
                </div>

                <div className="overview-icon">
                  <ClipboardCheck size={21} />
                </div>
              </div>

              <div className="attendance-circle">

                <div className="circle-inner">
                  <strong>
                    {loading
                      ? "..."
                      : `${stats.attendancePercentage ?? 0}%`}
                  </strong>

                  <span>Attendance</span>
                </div>

              </div>

            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">

              <div className="card-header">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Manage your system</p>
                </div>
              </div>

              <div className="quick-actions">

                <Link to="/students" className="quick-action">
                  <Users size={20} />
                  <div>
                    <strong>Manage Students</strong>
                    <span>View and manage students</span>
                  </div>
                </Link>

                <Link to="/teachers" className="quick-action">
                  <UserRound size={20} />
                  <div>
                    <strong>Manage Teachers</strong>
                    <span>View and manage teachers</span>
                  </div>
                </Link>

                <Link to="/attendance" className="quick-action">
                  <ClipboardCheck size={20} />
                  <div>
                    <strong>Mark Attendance</strong>
                    <span>Record today's attendance</span>
                  </div>
                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;