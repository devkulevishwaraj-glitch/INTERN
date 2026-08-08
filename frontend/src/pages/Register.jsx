import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserPlus,
  AlertCircle,
  Hash,
  Building2,
  BookOpen,
} from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  // Student fields
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");

  // Common field
  const [department, setDepartment] = useState("");

  // Teacher field
  const [employeeId, setEmployeeId] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // ==========================================
  // Change Role
  // ==========================================

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    setRole(selectedRole);

    // Clear role-specific fields
    setRollNo("");
    setSemester("");
    setDepartment("");
    setEmployeeId("");
  };

  // ==========================================
  // Submit Registration
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // Basic Validation
    // ==========================================

    if (!name || !email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    // ==========================================
    // Student Validation
    // ==========================================

    if (role === "student") {
      if (!rollNo || !department || !semester) {
        setError(
          "Please fill all student information."
        );
        return;
      }
    }

    // ==========================================
    // Teacher Validation
    // ==========================================

    if (role === "teacher") {
      if (!employeeId || !department) {
        setError(
          "Please fill all teacher information."
        );
        return;
      }
    }

    setLoading(true);

    try {
      // ==========================================
      // Basic Registration Data
      // ==========================================

      const registrationData = {
        name,
        email,
        password,
        role,
      };

      // ==========================================
      // Student Information
      // ==========================================

      if (role === "student") {
        registrationData.rollNo = rollNo;
        registrationData.department = department;
        registrationData.semester = semester;
      }

      // ==========================================
      // Teacher Information
      // ==========================================

      if (role === "teacher") {
        registrationData.employeeId = employeeId;
        registrationData.department = department;
      }

      console.log(
        "Registration data:",
        registrationData
      );

      await register(registrationData);

      // ==========================================
      // Redirect
      // ==========================================

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }

    } catch (err) {
      console.error(
        "Registration Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eef2ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "34px",
          boxShadow:
            "0 15px 40px rgba(15, 23, 42, 0.08)",
        }}
      >

        {/* ==========================================
            BRAND
        ========================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "11px",
            marginBottom: "25px",
          }}
        >

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GraduationCap size={27} />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "24px",
                color: "#111827",
              }}
            >
              Attendance
              <span style={{ color: "#2563eb" }}>
                Hub
              </span>
            </h1>

            <p
              style={{
                margin: "2px 0 0",
                fontSize: "10px",
                color: "#9ca3af",
                letterSpacing: "0.5px",
              }}
            >
              MANAGEMENT SYSTEM
            </p>
          </div>

        </div>


        {/* ==========================================
            TITLE
        ========================================== */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >

          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#eff6ff",
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <UserPlus size={21} />
          </div>

          <h2
            style={{
              margin: "0 0 6px",
              fontSize: "22px",
              color: "#111827",
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            Enter your complete information
          </p>

        </div>


        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "11px 12px",
              borderRadius: "9px",
              marginBottom: "18px",
              fontSize: "12px",
            }}
          >
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}


        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <FormInput
            icon={<User size={17} />}
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            type="text"
          />


          {/* EMAIL */}

          <FormInput
            icon={<Mail size={17} />}
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            type="email"
          />


          {/* PASSWORD */}

          <div style={{ marginBottom: "16px" }}>

            <label style={labelStyle}>
              Password
            </label>

            <div style={inputWrapperStyle}>

              <Lock
                size={17}
                color="#9ca3af"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                style={inputStyle}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>


          {/* ACCOUNT ROLE */}

          <div style={{ marginBottom: "16px" }}>

            <label style={labelStyle}>
              Account Role
            </label>

            <div style={{ position: "relative" }}>

              <ShieldCheck
                size={17}
                color="#9ca3af"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />

              <select
                value={role}
                onChange={handleRoleChange}
                style={{
                  ...inputStyle,
                  width: "100%",
                  height: "44px",
                  border:
                    "1px solid #d1d5db",
                  borderRadius: "9px",
                  paddingLeft: "38px",
                  background: "white",
                  cursor: "pointer",
                }}
              >

                <option value="student">
                  Student
                </option>

                <option value="teacher">
                  Teacher
                </option>

                <option value="admin">
                  Administrator
                </option>

              </select>

            </div>

          </div>


          {/* ==========================================
              STUDENT INFORMATION
          ========================================== */}

          {role === "student" && (
            <>

              <FormInput
                icon={<Hash size={17} />}
                label="Roll Number"
                placeholder="Enter your roll number"
                value={rollNo}
                onChange={(e) =>
                  setRollNo(e.target.value)
                }
                type="text"
              />

              <FormInput
                icon={<Building2 size={17} />}
                label="Department"
                placeholder="e.g. Computer Engineering"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                type="text"
              />

              {/* SEMESTER */}

              <div style={{ marginBottom: "16px" }}>

                <label style={labelStyle}>
                  Semester
                </label>

                <div style={inputWrapperStyle}>

                  <BookOpen
                    size={17}
                    color="#9ca3af"
                  />

                  <select
                    value={semester}
                    onChange={(e) =>
                      setSemester(e.target.value)
                    }
                    required
                    style={{
                      ...inputStyle,
                      background:
                        "transparent",
                      cursor: "pointer",
                    }}
                  >

                    <option value="">
                      Select Semester
                    </option>

                    <option value="1">
                      Semester 1
                    </option>

                    <option value="2">
                      Semester 2
                    </option>

                    <option value="3">
                      Semester 3
                    </option>

                    <option value="4">
                      Semester 4
                    </option>

                    <option value="5">
                      Semester 5
                    </option>

                    <option value="6">
                      Semester 6
                    </option>

                  </select>

                </div>

              </div>

            </>
          )}


          {/* ==========================================
              TEACHER INFORMATION
          ========================================== */}

          {role === "teacher" && (
            <>

              <FormInput
                icon={<Hash size={17} />}
                label="Employee ID"
                placeholder="Enter employee ID"
                value={employeeId}
                onChange={(e) =>
                  setEmployeeId(e.target.value)
                }
                type="text"
              />

              <FormInput
                icon={<Building2 size={17} />}
                label="Department"
                placeholder="e.g. Computer Engineering"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                type="text"
              />

            </>
          )}


          {/* ==========================================
              REGISTER BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "45px",
              border: "none",
              borderRadius: "9px",
              background:
                loading
                  ? "#93c5fd"
                  : "#2563eb",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "5px",
            }}
          >

            <UserPlus size={17} />

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* ==========================================
            LOGIN LINK
        ========================================== */}

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            paddingTop: "18px",
            borderTop:
              "1px solid #f1f5f9",
          }}
        >

          <span
            style={{
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>

        </div>


        {/* FOOTER */}

        <p
          style={{
            textAlign: "center",
            margin: "18px 0 0",
            color: "#9ca3af",
            fontSize: "10px",
          }}
        >
          © 2026 AttendanceHub · Student Attendance Management System
        </p>

      </div>

    </div>
  );
}


// ==========================================
// Reusable Input Component
// ==========================================

function FormInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
  type,
}) {
  return (
    <div style={{ marginBottom: "16px" }}>

      <label style={labelStyle}>
        {label}
      </label>

      <div style={inputWrapperStyle}>

        <span style={{ color: "#9ca3af" }}>
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          style={inputStyle}
        />

      </div>

    </div>
  );
}


// ==========================================
// Styles
// ==========================================

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#374151",
};

const inputWrapperStyle = {
  height: "44px",
  border: "1px solid #d1d5db",
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 12px",
};

const inputStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  fontSize: "13px",
  color: "#111827",
  background: "transparent",
};

export default Register;