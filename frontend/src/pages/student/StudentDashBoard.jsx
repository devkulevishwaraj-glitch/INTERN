import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { getStudentDashboard } from "../../services/studentService";

function StudentDashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    attendancePercentage: 0,
    totalSubjects: 0,
    presentDays: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getStudentDashboard();

      setDashboard({
        attendancePercentage: res.data.attendancePercentage,
        totalSubjects: res.data.totalSubjects,
        presentDays: res.data.presentDays,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Student Dashboard</h1>

      <h2 style={{ marginTop: "20px" }}>
        Welcome, {user?.name}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Attendance Percentage</h3>
          <h2>{dashboard.attendancePercentage}%</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Subjects</h3>
          <h2>{dashboard.totalSubjects}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Present Days</h3>
          <h2>{dashboard.presentDays}</h2>
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

export default StudentDashboard;