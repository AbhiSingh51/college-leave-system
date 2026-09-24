import DashboardCard from "../../components/DashboardCard";
import { useLeaveData } from "../../hooks/useLeaveData";
import { DEMO_USERS, ROLES, DEPARTMENTS } from "../../data/mockData";

export default function AdminDashboard() {
  const { applications } = useLeaveData();
  const totalStudents = DEMO_USERS.filter((u) => u.role === ROLES.STUDENT).length;
  const totalTeachers = DEMO_USERS.filter((u) => u.role === ROLES.TEACHER || u.role === ROLES.HOD).length;
  const pending = applications.filter((a) => a.status === "pending").length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  return (
    <div>
      <h1>Administrator Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Institution-wide overview of the leave management system.</p>

      <div className="stat-grid">
        <DashboardCard label="Total Students" value={totalStudents} icon="🎓" />
        <DashboardCard label="Total Teachers" value={totalTeachers} icon="🧑‍🏫" />
        <DashboardCard label="Total Leave Applications" value={applications.length} icon="📋" />
        <DashboardCard label="Pending Applications" value={pending} icon="⏳" />
      </div>
      <div className="stat-grid">
        <DashboardCard label="Approved Applications" value={approved} icon="✅" />
        <DashboardCard label="Rejected Applications" value={rejected} icon="✕" />
        <DashboardCard label="Departments" value={DEPARTMENTS.length} icon="🏛️" />
        <DashboardCard label="Approval Rate" value={`${Math.round((approved / (applications.length || 1)) * 100)}%`} icon="📈" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Department Overview</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Department</th><th>Students</th><th>Teachers</th><th>Leave Applications</th></tr></thead>
            <tbody>
              {DEPARTMENTS.map((d) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td>{d.students}</td>
                  <td>{d.teachers}</td>
                  <td>{applications.filter((a) => a.department === d.name).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
