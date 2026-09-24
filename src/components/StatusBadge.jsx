import { statusBadgeClass } from "../utils/helpers";

const LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${statusBadgeClass(status)}`}>
      <span className="badge-dot" />
      {LABELS[status] || status}
    </span>
  );
}
