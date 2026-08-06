import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

function TeacherDashboard() {
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalAttendance: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats({
        totalSubjects: res.data.totalSubjects,
        totalAttendance: res.data.totalAttendance,
        totalStudents: res.data.totalStudents,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Teacher Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>My Subjects</h3>
          <h2>{stats.totalSubjects}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Today's Attendance</h3>
          <h2>{stats.totalAttendance}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Students</h3>
          <h2>{stats.totalStudents}</h2>
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

export default TeacherDashboard;