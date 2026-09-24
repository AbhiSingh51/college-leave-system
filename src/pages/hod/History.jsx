import ApplicationTable from "../../components/ApplicationTable";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";

export default function HodStudentHistory() {
  const { user } = useAuth();
  const { applications } = useLeaveData();
  const deptApps = applications.filter((a) => a.department === user.department);

  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>Student Leave History</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Full leave record for {user.department} students.</p>
      <ApplicationTable applications={deptApps} showStudent basePath="/hod/review" emptyMessage="No applications on record." />
    </div>
  );
}
