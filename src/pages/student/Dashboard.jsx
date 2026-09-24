import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import StatusBadge from "../../components/StatusBadge";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";
import { formatDate } from "../../utils/helpers";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const mine = applications.filter((a) => a.studentId === user.id);

  const pending = mine.filter((a) => a.status === "pending").length;
  const approved = mine.filter((a) => a.status === "approved").length;
  const rejected = mine.filter((a) => a.status === "rejected").length;

  const upcoming = mine
    .filter((a) => a.status === "approved" && a.startDate >= new Date().toISOString().slice(0, 10))
    .slice(0, 3);

  return (
    <div>
      <div className="section-heading">
        <div>
          <h1>Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="text-muted mt-0">{user.department} · Semester {user.semester} · Section {user.section}</p>
        </div>
        <Link to="/student/apply"><Button variant="accent">Apply for Leave</Button></Link>
      </div>

      <div className="stat-grid">
        <DashboardCard label="Total Applications" value={mine.length} icon="📋" />
        <DashboardCard label="Pending Applications" value={pending} icon="⏳" />
        <DashboardCard label="Approved Leaves" value={approved} icon="✅" />
        <DashboardCard label="Rejected Leaves" value={rejected} icon="✕" />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-heading"><h3>Recent Applications</h3>
          <Link to="/student/applications">View all</Link>
        </div>
        {mine.slice(0, 3).map((app) => (
          <div key={app.id} className="record-card">
            <div className="record-card-row"><span className="label">{app.id}</span><StatusBadge status={app.status} /></div>
            <div className="record-card-row"><span className="label">Type</span><span>{app.leaveType}</span></div>
            <div className="record-card-row"><span className="label">Dates</span><span>{formatDate(app.startDate)} – {formatDate(app.endDate)}</span></div>
          </div>
        ))}
        {mine.length === 0 && <p className="text-muted">No applications yet. Apply for your first leave above.</p>}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 12 }}>Upcoming Approved Leaves</h3>
        {upcoming.length === 0 ? (
          <p className="text-muted">No upcoming approved leaves.</p>
        ) : (
          upcoming.map((app) => (
            <div key={app.id} className="record-card">
              <div className="record-card-row"><span className="label">{app.leaveType}</span><span>{formatDate(app.startDate)} – {formatDate(app.endDate)}</span></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
