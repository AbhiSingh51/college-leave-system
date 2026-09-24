import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import { useLeaveData } from "../hooks/useLeaveData";

export default function DashboardLayout({ links }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts } = useLeaveData();

  return (
    <div className="app-shell">
      <Notification toasts={toasts} />
      <Sidebar links={links} open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="main-column">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
