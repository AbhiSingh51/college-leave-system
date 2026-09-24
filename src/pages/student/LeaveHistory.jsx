import ApplicationTable from "../../components/ApplicationTable";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";

export default function LeaveHistory() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const decided = applications.filter((a) => a.studentId === user.id && a.status !== "pending");

  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>Leave History</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Your complete record of decided leave applications.</p>
      <ApplicationTable
        applications={decided}
        basePath="/student/applications"
        emptyMessage="No decided applications yet."
      />
    </div>
  );
}
