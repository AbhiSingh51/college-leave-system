import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";
import { DEMO_USERS, ROLES } from "../../data/mockData";
import { initials } from "../../utils/helpers";

export default function TeacherStudents() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const students = DEMO_USERS.filter((u) => u.role === ROLES.STUDENT && u.department === user.department);

  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>Students</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Students under your supervision in {user.department}.</p>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Student</th><th>Student ID</th><th>Semester</th><th>Section</th><th>Total Leaves</th></tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="navbar-avatar" style={{ background: "var(--color-accent-soft)", color: "var(--color-primary)" }}>{initials(s.name)}</span>
                  {s.name}
                </td>
                <td>{s.id}</td>
                <td>{s.semester}</td>
                <td>{s.section}</td>
                <td>{applications.filter((a) => a.studentId === s.id).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
