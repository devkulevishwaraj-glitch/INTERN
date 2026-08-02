import DashboardLayout from "../../components/dashboard/DashboardLayout";

function TeacherDashboard() {
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
          <h2>1</h2>
        </div>

        <div style={cardStyle}>
          <h3>Today's Attendance</h3>
          <h2>1</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Students</h3>
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

export default TeacherDashboard;