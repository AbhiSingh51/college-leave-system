import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Button from "./Button";
import { formatDate } from "../utils/helpers";

const PAGE_SIZE = 5;

export default function ApplicationTable({
  applications,
  columns = ["id", "leaveType", "dates", "days", "appliedOn", "status"],
  showStudent = false,
  basePath = "/student/applications",
  onCancel,
  onView,
  emptyMessage = "No leave applications found.",
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = applications.filter((app) => {
    const matchesSearch =
      !search ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      app.leaveType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="table-toolbar">
        <input
          className="form-input"
          style={{ maxWidth: 240 }}
          placeholder="Search by ID, name or type…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          aria-label="Search applications"
        />
        <div className="filters">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className="table-wrap card-collapse">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  {showStudent && <th>Student</th>}
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    {showStudent && <td>{app.studentName}<br /><span className="text-muted">{app.studentId}</span></td>}
                    <td>{app.leaveType}</td>
                    <td>{formatDate(app.startDate)}</td>
                    <td>{formatDate(app.endDate)}</td>
                    <td>{app.days}</td>
                    <td>{formatDate(app.appliedOn)}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Link to={`${basePath}/${app.id}`}><Button variant="outline" size="sm">View</Button></Link>
                        {app.status === "pending" && onCancel && (
                          <Button variant="danger" size="sm" onClick={() => onCancel(app.id)}>Cancel</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-cards card-collapse">
            {pageItems.map((app) => (
              <div className="record-card" key={app.id}>
                <div className="record-card-row"><span className="label">ID</span><span>{app.id}</span></div>
                {showStudent && <div className="record-card-row"><span className="label">Student</span><span>{app.studentName}</span></div>}
                <div className="record-card-row"><span className="label">Type</span><span>{app.leaveType}</span></div>
                <div className="record-card-row"><span className="label">Dates</span><span>{formatDate(app.startDate)} – {formatDate(app.endDate)}</span></div>
                <div className="record-card-row"><span className="label">Status</span><StatusBadge status={app.status} /></div>
                <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                  <Link to={`${basePath}/${app.id}`}><Button variant="outline" size="sm">View</Button></Link>
                  {app.status === "pending" && onCancel && (
                    <Button variant="danger" size="sm" onClick={() => onCancel(app.id)}>Cancel</Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹ Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === page ? "active" : ""} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next ›</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
