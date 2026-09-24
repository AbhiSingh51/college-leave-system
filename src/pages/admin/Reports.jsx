import { useLeaveData } from "../../hooks/useLeaveData";
import { LEAVE_TYPES } from "../../data/mockData";

export default function AdminReports() {
  const { applications } = useLeaveData();
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Reports</h1>
      <div className="card">
        <h3 style={{ marginBottom: 14 }}>Applications by Leave Type</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Leave Type</th><th>Total</th><th>Approved</th><th>Rejected</th><th>Pending</th></tr></thead>
            <tbody>
              {LEAVE_TYPES.map((type) => {
                const rows = applications.filter((a) => a.leaveType === type);
                return (
                  <tr key={type}>
                    <td>{type}</td>
                    <td>{rows.length}</td>
                    <td>{rows.filter((a) => a.status === "approved").length}</td>
                    <td>{rows.filter((a) => a.status === "rejected").length}</td>
                    <td>{rows.filter((a) => a.status === "pending").length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
