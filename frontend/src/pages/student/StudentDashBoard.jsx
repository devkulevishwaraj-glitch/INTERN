import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

function StudentDashboard() {
  const { user } = useAuth();

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
          <h2>100%</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Subjects</h3>
          <h2>1</h2>
        </div>

        <div style={cardStyle}>
          <h3>Present Days</h3>
          <h2>1</h2>
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