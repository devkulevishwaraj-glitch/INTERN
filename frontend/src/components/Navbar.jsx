import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
      }}
    >
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/attendance">Attendance</Link>
        </>
      )}

      <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;