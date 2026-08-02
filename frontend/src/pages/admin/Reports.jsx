import DashboardLayout from "../../components/dashboard/DashboardLayout";

function Reports() {
  return (
    <DashboardLayout>
      <h1>Reports</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Students</h3>
          <p>View Student Report</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Teachers</h3>
          <p>View Teacher Report</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Subjects</h3>
          <p>View Subject Report</p>
        </div>

        <div style={cardStyle}>
          <h3>Attendance Report</h3>
          <p>View Attendance</p>
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

export default Reports;