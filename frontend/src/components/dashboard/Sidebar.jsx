import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  UserRound,
  BookOpen,
  ClipboardCheck,
  FileBarChart,
  UserCircle,
  GraduationCap,
} from "lucide-react";

function Sidebar() {
  const { user } = useAuth();

  const getLinkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;

  return (
    <aside className="dashboard-sidebar">

      {/* ================= LOGO ================= */}
      <div className="sidebar-brand">

        <div className="sidebar-brand-icon">
          <GraduationCap size={26} />
        </div>

        <div>
          <h2>
            Attendance<span>Hub</span>
          </h2>

          <small>Management System</small>
        </div>

      </div>

      <div className="sidebar-divider"></div>


      {/* ================= ADMIN ================= */}
      {user?.role === "admin" && (
        <nav className="sidebar-menu">

          <p className="menu-title">MAIN MENU</p>

          <NavLink
            to="/admin"
            end
            className={getLinkClass}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/students"
            className={getLinkClass}
          >
            <Users size={19} />
            <span>Manage Students</span>
          </NavLink>

          <NavLink
            to="/teachers"
            className={getLinkClass}
          >
            <UserRound size={19} />
            <span>Manage Teachers</span>
          </NavLink>

          <NavLink
            to="/subjects"
            className={getLinkClass}
          >
            <BookOpen size={19} />
            <span>Manage Subjects</span>
          </NavLink>

          <NavLink
            to="/attendance"
            className={getLinkClass}
          >
            <ClipboardCheck size={19} />
            <span>Attendance</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={getLinkClass}
          >
            <FileBarChart size={19} />
            <span>Reports</span>
          </NavLink>

        </nav>
      )}


      {/* ================= TEACHER ================= */}
      {user?.role === "teacher" && (
        <nav className="sidebar-menu">

          <p className="menu-title">TEACHER MENU</p>

          <NavLink
            to="/teacher"
            end
            className={getLinkClass}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/attendance"
            className={getLinkClass}
          >
            <ClipboardCheck size={19} />
            <span>Mark Attendance</span>
          </NavLink>

          <NavLink
            to="/teacher/profile"
            className={getLinkClass}
          >
            <UserCircle size={19} />
            <span>Profile</span>
          </NavLink>

        </nav>
      )}


      {/* ================= STUDENT ================= */}
      {user?.role === "student" && (
        <nav className="sidebar-menu">

          <p className="menu-title">STUDENT MENU</p>

          <NavLink
            to="/student"
            end
            className={getLinkClass}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          {/* My Attendance */}
          <NavLink
            to="/student/my-attendance"
            className={getLinkClass}
          >
            <ClipboardCheck size={19} />
            <span>My Attendance</span>
          </NavLink>

          <NavLink
            to="/student/profile"
            className={getLinkClass}
          >
            <UserCircle size={19} />
            <span>Profile</span>
          </NavLink>

        </nav>
      )}


      {/* ================= BOTTOM USER ================= */}
      <div className="sidebar-bottom-info">

        <div className="sidebar-user-mini">

          <div className="mini-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>
              {user?.name || "User"}
            </strong>

            <span>
              {user?.role
                ? user.role.charAt(0).toUpperCase() +
                  user.role.slice(1)
                : "User"}
            </span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;