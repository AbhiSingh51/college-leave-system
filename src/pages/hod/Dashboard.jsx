import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import ApplicationTable from "../../components/ApplicationTable";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";

export default function HodDashboard() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const deptApps = applications.filter((a) => a.department === user.department);

  const pendingHod = deptApps.filter((a) => a.status === "pending" && a.stage === "hod");
  const approved = deptApps.filter((a) => a.status === "approved");
  const rejected = deptApps.filter((a) => a.status === "rejected");

  return (
    <div>
      <h1>HOD Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>{user.department} Department · Head of Department</p>

      <div className="stat-grid">
        <DashboardCard label="Pending HOD Approvals" value={pendingHod.length} icon="⏳" />
        <DashboardCard label="Approved Applications" value={approved.length} icon="✅" />
        <DashboardCard label="Rejected Applications" value={rejected.length} icon="✕" />
        <DashboardCard label="Department Applications" value={deptApps.length} icon="🏛️" />
      </div>

      <div className="card">
        <div className="section-heading"><h3>Pending Your Approval</h3></div>
        <ApplicationTable
          applications={pendingHod}
          showStudent
          basePath="/hod/review"
          emptyMessage="No applications awaiting your approval."
        />
      </div>
    </div>
  );
}
