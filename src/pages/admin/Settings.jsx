import Button from "../../components/Button";

export default function AdminSettings() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Settings</h1>
      <div className="card" style={{ maxWidth: 520 }}>
        <h3 style={{ marginBottom: 14 }}>Institution Details</h3>
        <div className="form-field full-width" style={{ marginBottom: 14 }}>
          <label className="form-label">College Name</label>
          <input className="form-input" defaultValue="St. Aldric's College" />
        </div>
        <div className="form-field full-width" style={{ marginBottom: 14 }}>
          <label className="form-label">Academic Year</label>
          <input className="form-input" defaultValue="2026 – 2027" />
        </div>
        <div className="checkbox-row" style={{ marginBottom: 18 }}>
          <input type="checkbox" defaultChecked />
          Require supporting document for medical leave
        </div>
        <Button variant="primary">Save Settings</Button>
      </div>
    </div>
  );
}
