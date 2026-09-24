import ApplicationTable from "../../components/ApplicationTable";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";

export default function MyApplications() {
  const { user } = useAuth();
  const { applications, cancelApplication } = useLeaveData();
  const mine = applications.filter((a) => a.studentId === user.id);

  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>My Applications</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>All leave applications you have submitted.</p>
      <ApplicationTable
        applications={mine}
        basePath="/student/applications"
        onCancel={cancelApplication}
        emptyMessage="You haven't submitted any leave applications yet."
      />
    </div>
  );
}
