import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content-wrapper">

        <Header />

        <main className="dashboard-page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;