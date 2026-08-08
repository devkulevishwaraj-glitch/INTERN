import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "teacher") {
        navigate("/teacher");
      } else if (loggedInUser.role === "student") {
        navigate("/student");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("Error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);

      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Left Section */}
      <div className="auth-left">
        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={32} />
          </div>

          <h2>Attendance<span>Hub</span></h2>
        </div>

        <div className="hero-content">
          <h1>
            Smart Attendance
            <br />
            Management System
          </h1>

          <p>
            Manage students, teachers, subjects and attendance
            from one simple and powerful platform.
          </p>
        </div>

        <div className="auth-footer">
          © 2026 AttendanceHub. All rights reserved.
        </div>
      </div>

      {/* Right Section */}
      <div className="auth-right">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="brand-icon">
              <GraduationCap size={28} />
            </div>
            <h2>Attendance<span>Hub</span></h2>
          </div>

          <div className="login-heading">
            <h1>Welcome Back 👋</h1>
            <p>Login to your account to continue</p>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <User size={19} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;