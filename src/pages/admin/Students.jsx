import { DEMO_USERS, ROLES } from "../../data/mockData";

export default function AdminStudents() {
  const students = DEMO_USERS.filter((u) => u.role === ROLES.STUDENT);
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Students</h1>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Student ID</th><th>Name</th><th>Department</th><th>Semester</th><th>Section</th></tr></thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}><td>{s.id}</td><td>{s.name}</td><td>{s.department}</td><td>{s.semester}</td><td>{s.section}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
