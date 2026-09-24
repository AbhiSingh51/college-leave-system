import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/helpers";

export default function TeacherProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>My Profile</h1>
      <div className="card">
        <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 24 }}>
          <div className="navbar-avatar" style={{ width: 64, height: 64, fontSize: "1.4rem", background: "var(--color-accent)" }}>
            {initials(user.name)}
          </div>
          <div>
            <h2 style={{ marginBottom: 2 }}>{user.name}</h2>
            <p className="text-muted mt-0">Class Teacher · {user.id}</p>
          </div>
        </div>
        <div className="doc-grid">
          <div className="doc-field"><div className="doc-field-label">Department</div><div className="doc-field-value">{user.department}</div></div>
          <div className="doc-field"><div className="doc-field-label">Email</div><div className="doc-field-value">{user.id.toLowerCase()}@staldric.edu</div></div>
        </div>
      </div>
    </div>
  );
}
