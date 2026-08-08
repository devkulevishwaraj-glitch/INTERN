import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// ================= DASHBOARDS =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// ================= PROFILES =================
import TeacherProfile from "./pages/teacher/Profile";
import StudentProfile from "./pages/student/Profile";

// ================= ADMIN CRUD =================
import Students from "./pages/Student";
import Teachers from "./pages/Teacher";
import Subjects from "./pages/Subject";

// ================= REPORTS =================
import Reports from "./pages/admin/Reports";

// ================= ATTENDANCE =================
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* ================= ADMIN ROUTES ================= */}

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


      {/* ================= TEACHER ROUTES ================= */}

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


      {/* ================= STUDENT ROUTES ================= */}

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


      {/* ================= ATTENDANCE ROUTES ================= */}

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