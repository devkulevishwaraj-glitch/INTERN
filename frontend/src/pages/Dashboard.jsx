import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 250px)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Students</h3>
          <h2>{stats.totalStudents}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Total Teachers</h3>
          <h2>{stats.totalTeachers}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Today's Attendance</h3>
          <h2>{stats.todayAttendance}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px" }}>
          <h3>Attendance Percentage</h3>
          <h2>{stats.attendancePercentage}%</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
