import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1>Teacher Profile</h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
        }}
      >
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </DashboardLayout>
  );
}

export default Profile;