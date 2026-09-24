import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";
import { formatDate } from "../../utils/helpers";

const today = new Date().toISOString().slice(0, 10);

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const dept = applications.filter((a) => a.department === user.department);

  const pending = dept.filter((a) => a.status === "pending" && a.stage === "teacher");
  const approvedToday = dept.filter((a) => a.history.some((h) => h.date === today && h.note.startsWith("Forwarded")));
  const rejectedToday = dept.filter((a) => a.status === "rejected" && a.history.some((h) => h.date === today));

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>{user.department} Department · Class Teacher</p>

      <div className="stat-grid">
        <DashboardCard label="Pending Requests" value={pending.length} icon="⏳" />
        <DashboardCard label="Approved Today" value={approvedToday.length} icon="✅" />
        <DashboardCard label="Rejected Today" value={rejectedToday.length} icon="✕" />
        <DashboardCard label="Total Applications" value={dept.length} icon="📋" />
      </div>

      <div className="card">
        <div className="section-heading">
          <h3>Pending Leave Applications</h3>
          <Link to="/teacher/pending">View all</Link>
        </div>
        {pending.slice(0, 5).map((app) => (
          <div key={app.id} className="record-card">
            <div className="record-card-row"><span className="label">{app.studentName} ({app.studentId})</span><StatusBadge status={app.status} /></div>
            <div className="record-card-row"><span className="label">{app.leaveType}</span><span>{formatDate(app.startDate)} – {formatDate(app.endDate)}</span></div>
            <Link to={`/teacher/review/${app.id}`}>Review application →</Link>
          </div>
        ))}
        {pending.length === 0 && <p className="text-muted">No pending applications right now.</p>}
      </div>
    </div>
  );
}
