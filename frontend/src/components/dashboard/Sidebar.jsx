import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Attendance System</h2>
      <hr />

      {/* Admin Menu */}
      {user?.role === "admin" && (
        <>
          <p>
            <Link to="/admin" style={linkStyle}>
              🏠 Dashboard
            </Link>
          </p>

          <p>
            <Link to="/students" style={linkStyle}>
              👨‍🎓 Manage Students
            </Link>
          </p>

          <p>
            <Link to="/teachers" style={linkStyle}>
              👨‍🏫 Manage Teachers
            </Link>
          </p>

          <p>
            <Link to="/subjects" style={linkStyle}>
              📚 Manage Subjects
            </Link>
          </p>

          <p>
            <Link to="/attendance" style={linkStyle}>
              📝 Attendance
            </Link>
          </p>

          <p>
            <Link to="/admin/reports" style={linkStyle}>
              📊 Reports
            </Link>
          </p>
        </>
      )}

      {/* Teacher Menu */}
      {user?.role === "teacher" && (
        <>
          <p>
            <Link to="/teacher" style={linkStyle}>
              🏠 Dashboard
            </Link>
          </p>

          <p>
            <Link to="/attendance" style={linkStyle}>
              📝 Mark Attendance
            </Link>
          </p>

          <p>
            <Link to="/teacher/profile" style={linkStyle}>
              👤 Profile
            </Link>
          </p>
        </>
      )}

      {/* Student Menu */}
      {user?.role === "student" && (
        <>
          <p>
            <Link to="/student" style={linkStyle}>
              🏠 Dashboard
            </Link>
          </p>

          <p>
            <Link to="/student/profile" style={linkStyle}>
              👤 Profile
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "8px 0",
};

export default Sidebar;