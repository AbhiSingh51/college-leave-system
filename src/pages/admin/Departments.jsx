import { DEPARTMENTS } from "../../data/mockData";

export default function AdminDepartments() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Departments</h1>
      <div className="stat-grid">
        {DEPARTMENTS.map((d) => (
          <div className="stat-card" key={d.name}>
            <div className="stat-label" style={{ marginBottom: 4 }}>{d.name}</div>
            <div className="stat-value" style={{ fontSize: "1.4rem" }}>{d.students} students</div>
            <div className="text-muted" style={{ fontSize: "0.82rem" }}>{d.teachers} teaching staff</div>
          </div>
        ))}
      </div>
    </div>
  );
}
