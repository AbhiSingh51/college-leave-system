import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";
import ApprovalTimeline from "../../components/ApprovalTimeline";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";
import { formatDate } from "../../utils/helpers";

export default function ApplicationReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applications, approveApplication, rejectApplication, requestMoreInfo } = useLeaveData();
  const app = applications.find((a) => a.id === id);

  const [modal, setModal] = useState(null); // "approve" | "reject" | "info"
  const [rejectReason, setRejectReason] = useState("");
  const [infoNote, setInfoNote] = useState("");

  if (!app) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p>Application not found.</p>
        <Link to="/teacher/pending">Back to Pending Applications</Link>
      </div>
    );
  }

  const canDecide = app.status === "pending" && (user.role === "teacher" || user.role === "hod");
  const backPath =
    user.role === "hod" ? "/hod/dashboard" :
    user.role === "admin" ? "/admin/applications" :
    "/teacher/pending";

  const handleApprove = () => {
    approveApplication(app.id, user.name);
    setModal(null);
    navigate(backPath);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    rejectApplication(app.id, user.name, rejectReason.trim());
    setModal(null);
    navigate(backPath);
  };

  const handleRequestInfo = () => {
    if (!infoNote.trim()) return;
    requestMoreInfo(app.id, user.name, infoNote.trim());
    setModal(null);
  };

  return (
    <div>
      <div className="section-heading">
        <h1>Review Application</h1>
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

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Approval Timeline</h3>
        <ApprovalTimeline application={app} />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        {canDecide && (
          <>
            <Button variant="success" onClick={() => setModal("approve")}>Approve Leave</Button>
            <Button variant="danger" onClick={() => setModal("reject")}>Reject Leave</Button>
            <Button variant="outline" onClick={() => setModal("info")}>Request More Information</Button>
          </>
        )}
      </div>

      {modal === "approve" && (
        <Modal
          title="Confirm Approval"
          onClose={() => setModal(null)}
          actions={<>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="success" onClick={handleApprove}>Confirm Approval</Button>
          </>}
        >
          Are you sure you want to approve this leave application for <strong>{app.studentName}</strong>?
        </Modal>
      )}

      {modal === "reject" && (
        <Modal
          title="Reason for Rejection"
          onClose={() => setModal(null)}
          actions={<>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleReject} disabled={!rejectReason.trim()}>Confirm Rejection</Button>
          </>}
        >
          <textarea
            className="form-textarea"
            rows={3}
            style={{ width: "100%" }}
            placeholder="Explain why this application is being rejected…"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </Modal>
      )}

      {modal === "info" && (
        <Modal
          title="Request More Information"
          onClose={() => setModal(null)}
          actions={<>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleRequestInfo} disabled={!infoNote.trim()}>Send Request</Button>
          </>}
        >
          <textarea
            className="form-textarea"
            rows={3}
            style={{ width: "100%" }}
            placeholder="What additional information do you need from the student?"
            value={infoNote}
            onChange={(e) => setInfoNote(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
}
