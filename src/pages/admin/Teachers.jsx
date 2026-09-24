import { TEACHERS_LIST } from "../../data/mockData";

export default function AdminTeachers() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Teachers</h1>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Staff ID</th><th>Name</th><th>Department</th><th>Students Assigned</th></tr></thead>
          <tbody>
            {TEACHERS_LIST.map((t) => (
              <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.department}</td><td>{t.students}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
