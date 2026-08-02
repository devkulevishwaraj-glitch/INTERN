import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalSubjects: 0,
    totalAttendance: 0,
    attendancePercentage: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await getDashboardStats();
      console.log(res.data);
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Students</h3>
          <h2>{stats.totalStudents}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Teachers</h3>
          <h2>{stats.totalTeachers}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Subjects</h3>
          <h2>{stats.totalSubjects}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Attendance</h3>
          <h2>{stats.totalAttendance}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Attendance Percentage</h3>
          <h2>{stats.attendancePercentage}%</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}

const cardStyle = {
  background: "#2563eb",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

export default AdminDashboard;