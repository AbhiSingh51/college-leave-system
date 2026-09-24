import ApplicationTable from "../../components/ApplicationTable";
import { useLeaveData } from "../../hooks/useLeaveData";

export default function AdminLeaveApplications() {
  const { applications } = useLeaveData();
  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>All Leave Applications</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Institution-wide leave records across every department.</p>
      <ApplicationTable applications={applications} showStudent basePath="/admin/applications" emptyMessage="No applications on record." />
    </div>
  );
}
