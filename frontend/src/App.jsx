import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";

import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// Teacher & Student Profile
import TeacherProfile from "./pages/teacher/Profile";
import StudentProfile from "./pages/student/Profile";

// Existing CRUD Pages
import Students from "./pages/Student";
import Teachers from "./pages/Teacher";
import Subjects from "./pages/Subject";

// Reports
import Reports from "./pages/admin/Reports";

// Attendance
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Teachers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Subjects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* ================= TEACHER ================= */}

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/profile"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= STUDENT ================= */}

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= ATTENDANCE ================= */}

      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={["admin", "teacher"]}>
            <Attendance />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;