import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h3>Student Attendance Management System</h3>

      <div>
        <span style={{ marginRight: "15px" }}>
          Welcome, {user?.name}
        </span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;