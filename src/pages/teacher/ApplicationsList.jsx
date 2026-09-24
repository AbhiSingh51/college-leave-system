import ApplicationTable from "../../components/ApplicationTable";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";

// status: "pending" | "approved" | "rejected"
export default function TeacherApplicationsList({ status, title, subtitle }) {
  const { user } = useAuth();
  const { applications } = useLeaveData();

  const deptApps = applications.filter((a) => a.department === user.department);
  const list = status === "pending"
    ? deptApps.filter((a) => a.status === "pending" && a.stage === "teacher")
    : deptApps.filter((a) => a.status === status);

  return (
    <div>
      <h1 style={{ marginBottom: 4 }}>{title}</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>{subtitle}</p>
      <ApplicationTable applications={list} showStudent basePath="/teacher/review" emptyMessage="No applications in this category." />
    </div>
  );
}
