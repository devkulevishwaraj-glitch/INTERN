import { LogOut } from "lucide-react";
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
    <header className="dashboard-header">

      <div className="header-title">
        <h3>Student Attendance Management System</h3>
        <p>Manage your attendance efficiently</p>
      </div>

      <div className="header-right">

        <div className="header-user">

          <div className="header-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="header-user-details">
            <strong>{user?.name || "User"}</strong>

            <span>
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "User"}
            </span>
          </div>

        </div>

        <button
          className="header-logout"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Header;