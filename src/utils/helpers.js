export function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function daysBetween(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export function statusBadgeClass(status) {
  switch (status) {
    case "approved": return "badge-approved";
    case "rejected": return "badge-rejected";
    default: return "badge-pending";
  }
}

export function generateApplicationId(existing = []) {
  const year = new Date().getFullYear();
  const next = 100 + existing.length;
  return `LV-${year}-${next}`;
}

export function validateLeaveForm(values) {
  const errors = {};
  if (!values.studentName?.trim()) errors.studentName = "Student name is required.";
  if (!values.studentId?.trim()) errors.studentId = "Student ID is required.";
  if (!values.department) errors.department = "Please select a department.";
  if (!values.semester) errors.semester = "Please select a semester.";
  if (!values.section?.trim()) errors.section = "Section is required.";
  if (!values.leaveType) errors.leaveType = "Please select a leave type.";
  if (!values.startDate) errors.startDate = "Start date is required.";
  if (!values.endDate) errors.endDate = "End date is required.";
  if (values.startDate && values.endDate && values.endDate < values.startDate) {
    errors.endDate = "End date cannot be before the start date.";
  }
  if (!values.reason?.trim() || values.reason.trim().length < 10) {
    errors.reason = "Please provide a reason of at least 10 characters.";
  }
  if (!values.emergencyContact?.trim()) errors.emergencyContact = "Emergency contact is required.";
  return errors;
}
