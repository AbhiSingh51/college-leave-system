import { useParams, useNavigate, Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import ApprovalTimeline from "../../components/ApprovalTimeline";
import Button from "../../components/Button";
import { useLeaveData } from "../../hooks/useLeaveData";
import { formatDate } from "../../utils/helpers";

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, cancelApplication } = useLeaveData();
  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p>Application not found.</p>
        <Link to="/student/applications">Back to My Applications</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="section-heading">
        <h1>Leave Application</h1>
        <StatusBadge status={app.status} />
      </div>

      <div className="document-card" style={{ marginBottom: 24 }}>
        <div className="document-header">
          <h2>St. Aldric's College — Leave Application</h2>
          <div className="doc-id">Application ID: {app.id} · Applied on {formatDate(app.appliedOn)}</div>
        </div>

        <div className="doc-section">
          <div className="doc-section-title">Student Information</div>
          <div className="doc-grid">
            <div className="doc-field"><div className="doc-field-label">Name</div><div className="doc-field-value">{app.studentName}</div></div>
            <div className="doc-field"><div className="doc-field-label">Student ID</div><div className="doc-field-value">{app.studentId}</div></div>
            <div className="doc-field"><div className="doc-field-label">Department</div><div className="doc-field-value">{app.department}</div></div>
            <div className="doc-field"><div className="doc-field-label">Semester</div><div className="doc-field-value">{app.semester}</div></div>
            <div className="doc-field"><div className="doc-field-label">Section</div><div className="doc-field-value">{app.section}</div></div>
          </div>
        </div>

        <div className="doc-section">
          <div className="doc-section-title">Leave Information</div>
          <div className="doc-grid">
            <div className="doc-field"><div className="doc-field-label">Leave Type</div><div className="doc-field-value">{app.leaveType}</div></div>
            <div className="doc-field"><div className="doc-field-label">Start Date</div><div className="doc-field-value">{formatDate(app.startDate)}</div></div>
            <div className="doc-field"><div className="doc-field-label">End Date</div><div className="doc-field-value">{formatDate(app.endDate)}</div></div>
            <div className="doc-field"><div className="doc-field-label">Number of Days</div><div className="doc-field-value">{app.days}</div></div>
            <div className="doc-field"><div className="doc-field-label">Emergency Contact</div><div className="doc-field-value">{app.emergencyContact}</div></div>
            <div className="doc-field"><div className="doc-field-label">Supporting Document</div><div className="doc-field-value">{app.document || "None attached"}</div></div>
          </div>
        </div>

        <div className="doc-section" style={{ marginBottom: 0 }}>
          <div className="doc-section-title">Reason for Leave</div>
          <p style={{ margin: 0 }}>{app.reason}</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Approval Timeline</h3>
        <ApprovalTimeline application={app} />
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        {app.status === "pending" && (
          <Button variant="danger" onClick={() => { cancelApplication(app.id); navigate("/student/applications"); }}>
            Cancel Application
          </Button>
        )}
      </div>
    </div>
  );
}
